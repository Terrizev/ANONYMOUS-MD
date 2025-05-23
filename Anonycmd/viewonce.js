const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

async function viewOnceCommand(sock, chatId, message) {
    try {
        let mediaMessage;
        // Check main message first
        const mainViewOnce = message.message?.viewOnceMessage?.message;
        if (mainViewOnce) {
            mediaMessage = mainViewOnce.imageMessage || mainViewOnce.videoMessage || mainViewOnce.audioMessage;
        } else {
            // Check quoted message
            const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            if (quotedMessage?.viewOnceMessage?.message) {
                mediaMessage = quotedMessage.viewOnceMessage.message.imageMessage || 
                             quotedMessage.viewOnceMessage.message.videoMessage || 
                             quotedMessage.viewOnceMessage.message.audioMessage;
            } else if (quotedMessage) {
                mediaMessage = quotedMessage.imageMessage || quotedMessage.videoMessage || quotedMessage.audioMessage;
            }
        }

        if (!mediaMessage) {
            await sock.sendMessage(chatId, { 
                text: 'Please send or reply to a view once message!'
            });
            return;
        }

        const mimeType = mediaMessage.mimetype;
        if (!mimeType) {
            await sock.sendMessage(chatId, { 
                text: '❌ Could not determine media type!'
            });
            return;
        }

        let mediaType;
        if (mimeType.startsWith('image/')) {
            mediaType = 'image';
        } else if (mimeType.startsWith('video/')) {
            mediaType = 'video';
        } else if (mimeType.startsWith('audio/')) {
            mediaType = 'audio';
        } else {
            await sock.sendMessage(chatId, { 
                text: `❌ Unsupported media type: ${mimeType}`
            });
            return;
        }

        switch (mediaType) {
            case 'image':
                await handleImage(sock, chatId, mediaMessage);
                break;
            case 'video':
                await handleVideo(sock, chatId, mediaMessage);
                break;
            case 'audio':
                await handleAudio(sock, chatId, mediaMessage);
                break;
        }

    } catch (error) {
        console.error('❌ Error in viewonce command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error processing view once message! Error: ' + error.message
        });
    }
}

async function handleImage(sock, chatId, mediaMessage) {
    try {
        const stream = await downloadContentFromMessage(mediaMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        await sock.sendMessage(chatId, { image: buffer });
    } catch (err) {
        console.error('❌ Error downloading image:', err);
        throw err;
    }
}

async function handleVideo(sock, chatId, mediaMessage) {
    try {
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const tempFile = path.join(tempDir, `temp_${Date.now()}.mp4`);
        const stream = await downloadContentFromMessage(mediaMessage, 'video');
        const writeStream = fs.createWriteStream(tempFile);
        
        for await (const chunk of stream) {
            writeStream.write(chunk);
        }
        writeStream.end();

        await new Promise((resolve) => writeStream.on('finish', resolve));

        await sock.sendMessage(chatId, { video: fs.readFileSync(tempFile) });
        fs.unlinkSync(tempFile);
    } catch (err) {
        console.error('❌ Error processing video:', err);
        throw err;
    }
}

async function handleAudio(sock, chatId, mediaMessage) {
    try {
        const stream = await downloadContentFromMessage(mediaMessage, 'audio');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        await sock.sendMessage(chatId, { 
            audio: buffer,
            mimetype: mediaMessage.mimetype
        });
    } catch (err) {
        console.error('❌ Error downloading audio:', err);
        throw err;
    }
}

module.exports = viewOnceCommand;