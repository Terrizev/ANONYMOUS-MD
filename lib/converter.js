const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { tmpdir } = require('os');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

async function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
    return new Promise(async (resolve, reject) => {
        const tempDir = tmpdir();
        const inputPath = path.join(tempDir, `input_${Date.now()}.${ext}`);
        const outputPath = path.join(tempDir, `output_${Date.now()}.${ext2}`);
        
        try {
            await fs.promises.writeFile(inputPath, buffer);
            
            const ffmpegArgs = ['-y', '-i', inputPath, ...args, outputPath];
            const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);
            
            let errorOutput = '';
            ffmpegProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });
            
            ffmpegProcess.on('close', async (code) => {
                try {
                    if (code !== 0) {
                        throw new Error(`FFmpeg process exited with code ${code}\n${errorOutput}`);
                    }
                    
                    const outputBuffer = await fs.promises.readFile(outputPath);
                    resolve(outputBuffer);
                } catch (error) {
                    reject(error);
                } finally {
                    // Cleanup files
                    try {
                        await Promise.all([
                            fs.promises.unlink(inputPath).catch(() => {}),
                            fs.promises.unlink(outputPath).catch(() => {})
                        ]);
                    } catch (cleanupError) {
                        console.error('Cleanup error:', cleanupError);
                    }
                }
            });
            
            ffmpegProcess.on('error', (error) => {
                reject(error);
            });
            
        } catch (error) {
            reject(error);
        }
    });
}

async function toAudio(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-ac', '2',
        '-b:a', '192k',
        '-ar', '44100',
        '-f', 'mp3'
    ], ext, 'mp3');
}

async function toPTT(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
        '-compression_level', '10',
        '-f', 'opus'
    ], ext, 'opus');
}

async function toVideo(buffer, ext) {
    return ffmpeg(buffer, [
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-ab', '128k',
        '-ar', '44100',
        '-crf', '28',
        '-preset', 'fast',
        '-movflags', '+faststart',
        '-f', 'mp4'
    ], ext, 'mp4');
}

async function addExifAvatar(buffer, packname, author) {
    try {
        const sticker = new Sticker(buffer, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 70
        });
        
        return await sticker.toBuffer();
    } catch (error) {
        console.error('Sticker creation error:', error);
        throw error;
    }
}

module.exports = {
    toAudio,
    toPTT,
    toVideo,
    ffmpeg,
    addExifAvatar
};