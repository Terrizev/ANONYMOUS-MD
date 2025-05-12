/*Créditos A Quien Correspondan 
Play Traido y Editado 
Por Cuervo-Team-Supreme*/
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
                text: "What song do you want to download?"
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

        // Send loading message
        await sock.sendMessage(chatId, {
            text: `*${video.title}*\n\n*Duration:* ${formatDuration(video.duration.seconds)}\n*Views:* ${formatNumber(video.views)}\n\n_Downloading your song..._`
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
            
            if (siputzxData && siputzxData.data && siputzxData.data.dl) {
                // Download the file first
                const response = await fetch(siputzxData.data.dl);
                const buffer = await response.buffer();
                
                // Write to temp file
                fs.writeFileSync(tempM4a, buffer);
                
                // Convert to MP3 with proper WhatsApp-compatible settings
                await execPromise(`ffmpeg -i "${tempM4a}" -vn -acodec libmp3lame -ac 2 -ab 128k -ar 44100 "${tempFile}"`);
                
                // Check file size
                const stats = fs.statSync(tempFile);
                if (stats.size < 1024) {
                    throw new Error('Conversion failed');
                }

                await sock.sendMessage(chatId, {
                    audio: { url: tempFile },
                    mimetype: "audio/mpeg",
                    fileName: `${video.title}.mp3`,
                    ptt: false
                }, { quoted: message });

                // Clean up temp files
                setTimeout(() => {
                    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                    if (fs.existsSync(tempM4a)) fs.unlinkSync(tempM4a);
                }, 5000);
                return;
            }
        } catch (e1) {
            console.error('Error with siputzx API:', e1);
            try {
                // Try zenkey API as fallback
                const zenkeyRes = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(videoUrl)}`);
                const zenkeyData = await zenkeyRes.json();
                
                if (zenkeyData && zenkeyData.result && zenkeyData.result.downloadUrl) {
                    // Download the file first
                    const response = await fetch(zenkeyData.result.downloadUrl);
                    const buffer = await response.buffer();
                    
                    // Write to temp file
                    fs.writeFileSync(tempM4a, buffer);
                    
                    // Convert to MP3 with proper WhatsApp-compatible settings
                    await execPromise(`ffmpeg -i "${tempM4a}" -vn -acodec libmp3lame -ac 2 -ab 128k -ar 44100 "${tempFile}"`);
                    
                    // Check file size
                    const stats = fs.statSync(tempFile);
                    if (stats.size < 1024) {
                        throw new Error('Conversion failed');
                    }

                    await sock.sendMessage(chatId, {
                        audio: { url: tempFile },
                        mimetype: "audio/mpeg",
                        fileName: `${video.title}.mp3`,
                        ptt: false
                    }, { quoted: message });

                    // Clean up temp files
                    setTimeout(() => {
                        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                        if (fs.existsSync(tempM4a)) fs.unlinkSync(tempM4a);
                    }, 5000);
                    return;
                }
            } catch (e2) {
                console.error('Error with zenkey API:', e2);
                try {
                    // Try axeel API as last resort
                    const axeelRes = await fetch(`https://api.axeel.my.id/api/download/ytmp3?apikey=axeel&url=${encodeURIComponent(videoUrl)}`);
                    const axeelData = await axeelRes.json();
                    
                    if (axeelData && axeelData.result && axeelData.result.downloadUrl) {
                        // Download the file first
                        const response = await fetch(axeelData.result.downloadUrl);
                        const buffer = await response.buffer();
                        
                        // Write to temp file
                        fs.writeFileSync(tempM4a, buffer);
                        
                        // Convert to MP3 with proper WhatsApp-compatible settings
                        await execPromise(`ffmpeg -i "${tempM4a}" -vn -acodec libmp3lame -ac 2 -ab 128k -ar 44100 "${tempFile}"`);
                        
                        // Check file size
                        const stats = fs.statSync(tempFile);
                        if (stats.size < 1024) {
                            throw new Error('Conversion failed');
                        }

                        await sock.sendMessage(chatId, {
                            audio: { url: tempFile },
                            mimetype: "audio/mpeg",
                            fileName: `${video.title}.mp3`,
                            ptt: false
                        }, { quoted: message });

                        // Clean up temp files
                        setTimeout(() => {
                            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                            if (fs.existsSync(tempM4a)) fs.unlinkSync(tempM4a);
                        }, 5000);
                        return;
                    }
                } catch (e3) {
                    console.error('Error with axeel API:', e3);
                    throw new Error("All download methods failed");
                }
            }
        }
    } catch (error) {
        console.error('Error in song command:', error);
        await sock.sendMessage(chatId, { 
            text: "Failed to download the song. Please try again later or try a different song."
        });
    }
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = songCommand; 