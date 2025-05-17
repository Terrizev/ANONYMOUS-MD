const axios = require('axios');
const yts = require('yt-search');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function songCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        const searchQuery = text.split(' ').slice(1).join(' ').trim();
        
        if (!searchQuery) {
            return await sock.sendMessage(chatId, { 
                text: "Example: .play Amagulu"
            });
        }

        // Search for the song
        const { videos } = await yts(searchQuery);
        if (!videos || videos.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: "No songs found!"
            });
        }

        const video = videos[0];
        const videoUrl = video.url;

        // Format message components
        const formattedDuration = formatDuration(video.duration.seconds);
        const formattedViews = formatNumber(video.views);

        // Custom message format
        const ytmsg = `╔═══〔 *𓆩ု᪳ANONYMOUS-𝐌𝐃ှ᪳𓆪* 〕═══❒
║╭───────────────◆  
║│ *ANONYMOUS-𝐌𝐃 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ ⿻ *ᴛɪᴛʟᴇ:*  ${video.title}
║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${formattedDuration}
║ ⿻ *ᴠɪᴇᴡs:*  ${formattedViews}
║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${video.author.name}
║ ⿻ *ʟɪɴᴋ:*  ${videoUrl}
╚══════════════════❒
*ғꪮʀ ʏꪮꪊ ғꪮʀ ᴀʟʟ ꪮғ ᴀꜱ 🍉*`;

        // Send formatted message
        await sock.sendMessage(chatId, {
            text: ytmsg
        }, { quoted: message });

        // Create temp directory if it doesn't exist
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const tempFile = path.join(tempDir, `${Date.now()}.mp3`);
        const tempM4a = path.join(tempDir, `${Date.now()}.m4a`);

        try {
            // Try siputzx API first
            const siputzxRes = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(videoUrl)}`);
            const siputzxData = await siputzxRes.json();
            
            if (siputzxData?.data?.dl) {
                const response = await fetch(siputzxData.data.dl);
                const buffer = await response.buffer();
                fs.writeFileSync(tempM4a, buffer);
                
                await execPromise(`ffmpeg -i "${tempM4a}" -vn -acodec libmp3lame -ac 2 -ab 128k -ar 44100 "${tempFile}"`);
                
                const stats = fs.statSync(tempFile);
                if (stats.size < 1024) throw new Error('Conversion failed');

                await sock.sendMessage(chatId, {
                    audio: { url: tempFile },
                    mimetype: "audio/mpeg",
                    fileName: `${video.title}.mp3`,
                    ptt: false
                }, { quoted: message });

                setTimeout(() => {
                    [tempFile, tempM4a].forEach(file => {
                        if (fs.existsSync(file)) fs.unlinkSync(file);
                    });
                }, 5000);
                return;
            }
        } catch (e1) {
            console.error('Siputzx API error:', e1);
            try {
                // Try zenkey API
                const zenkeyRes = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(videoUrl)}`);
                const zenkeyData = await zenkeyRes.json();
                
                if (zenkeyData?.result?.downloadUrl) {
                    const response = await fetch(zenkeyData.result.downloadUrl);
                    const buffer = await response.buffer();
                    fs.writeFileSync(tempM4a, buffer);
                    
                    await execPromise(`ffmpeg -i "${tempM4a}" -vn -acodec libmp3lame -ac 2 -ab 128k -ar 44100 "${tempFile}"`);
                    
                    const stats = fs.statSync(tempFile);
                    if (stats.size < 1024) throw new Error('Conversion failed');

                    await sock.sendMessage(chatId, {
                        audio: { url: tempFile },
                        mimetype: "audio/mpeg",
                        fileName: `${video.title}.mp3`,
                        ptt: false
                    }, { quoted: message });

                    setTimeout(() => {
                        [tempFile, tempM4a].forEach(file => {
                            if (fs.existsSync(file)) fs.unlinkSync(file);
                        });
                    }, 5000);
                    return;
                }
            } catch (e2) {
                console.error('Zenkey API error:', e2);
                try {
                    // Try axeel API
                    const axeelRes = await fetch(`https://api.axeel.my.id/api/download/ytmp3?apikey=axeel&url=${encodeURIComponent(videoUrl)}`);
                    const axeelData = await axeelRes.json();
                    
                    if (axeelData?.result?.downloadUrl) {
                        const response = await fetch(axeelData.result.downloadUrl);
                        const buffer = await response.buffer();
                        fs.writeFileSync(tempM4a, buffer);
                        
                        await execPromise(`ffmpeg -i "${tempM4a}" -vn -acodec libmp3lame -ac 2 -ab 128k -ar 44100 "${tempFile}"`);
                        
                        const stats = fs.statSync(tempFile);
                        if (stats.size < 1024) throw new Error('Conversion failed');

                        await sock.sendMessage(chatId, {
                            audio: { url: tempFile },
                            mimetype: "audio/mpeg",
                            fileName: `${video.title}.mp3`,
                            ptt: false
                        }, { quoted: message });

                        setTimeout(() => {
                            [tempFile, tempM4a].forEach(file => {
                                if (fs.existsSync(file)) fs.unlinkSync(file);
                            });
                        }, 5000);
                        return;
                    }
                } catch (e3) {
                    console.error('Axeel API error:', e3);
                    throw new Error("All download methods failed");
                }
            }
        }
    } catch (error) {
        console.error('Song command error:', error);
        await sock.sendMessage(chatId, { 
            text: "❌ Failed to download the song. Please try again later or try a different song."
        });
    }
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return hours > 0 
        ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
        : `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = songCommand;