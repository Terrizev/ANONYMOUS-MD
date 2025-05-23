const axios = require('axios');
const FormData = require('form-data');
const { fileTypeFromBuffer } = require('file-type');
const { channelInfo } = require('../lib/messageConfig');

const MAX_FILE_SIZE_MB = 200;

async function uploadMedia(buffer) {
    try {
        console.log('[DEBUG] Starting file type detection');
        const fileType = await fileTypeFromBuffer(buffer);
        if (!fileType) {
            console.error('[ERROR] Unsupported file type');
            throw new Error('Unsupported file type');
        }

        console.log(`[DEBUG] Detected file type: ${fileType.ext}`);

        const form = new FormData();
        form.append('fileToUpload', buffer, `file.${fileType.ext}`);
        form.append('reqtype', 'fileupload');

        console.log('[DEBUG] Sending to Catbox');
        const response = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders(),
            timeout: 30000 // 30 seconds timeout
        });

        console.log(`[DEBUG] Upload response: ${response.status} - ${response.data}`);
        return response.data;
    } catch (error) {
        console.error('[UPLOAD ERROR]', error.stack);
        if (error.response) {
            console.error('[API RESPONSE]', error.response.data);
        }
        throw new Error(`Upload failed: ${error.message}`);
    }
}

async function tourlCommand(sock, chatId, message) {
    try {
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quotedMessage) {
            console.log('[ERROR] No quoted message');
            return sock.sendMessage(chatId, {
                text: '🚫 Please reply to a media message to upload!',
                ...channelInfo
            });
        }

        console.log('[DEBUG] Quoted message exists');
        const mediaType = Object.keys(quotedMessage)[0];
        const allowedTypes = ['imageMessage', 'videoMessage', 'audioMessage'];
        
        if (!allowedTypes.includes(mediaType)) {
            console.log(`[ERROR] Unsupported type: ${mediaType}`);
            return sock.sendMessage(chatId, {
                text: '❌ Unsupported file type!',
                ...channelInfo
            });
        }

        console.log(`[DEBUG] Media type: ${mediaType}`);
        await sock.sendMessage(chatId, {
            text: '⏳ Downloading media...',
            ...channelInfo
        });

        console.log('[DEBUG] Downloading media');
        const mediaBuffer = await sock.downloadMediaMessage(quotedMessage);
        if (!mediaBuffer || mediaBuffer.length === 0) {
            console.error('[ERROR] Empty media buffer');
            throw new Error('Empty media content');
        }

        console.log(`[DEBUG] File size: ${Math.round(mediaBuffer.length / 1024 / 1024)}MB`);
        const fileSizeMB = mediaBuffer.length / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            console.error(`[ERROR] File too large: ${fileSizeMB}MB`);
            return sock.sendMessage(chatId, {
                text: `📁 File too big! (Max ${MAX_FILE_SIZE_MB}MB)`,
                ...channelInfo
            });
        }

        await sock.sendMessage(chatId, {
            text: '⏳ Uploading to Catbox...',
            ...channelInfo
        });

        console.log('[DEBUG] Starting upload');
        const mediaUrl = await uploadMedia(mediaBuffer);
        console.log(`[SUCCESS] Uploaded to: ${mediaUrl}`);

        const sender = message.key.participant || message.key.remoteJid;
        const username = sender.split('@')[0];

        await sock.sendMessage(chatId, {
            text: `✅ Upload successful!\n\n🔗 URL: ${mediaUrl}`,
            mentions: [sender],
            ...channelInfo
        });

    } catch (error) {
        console.error('[FINAL ERROR]', error.stack);
        await sock.sendMessage(chatId, {
            text: `❌ Failed to process: ${error.message}`,
            ...channelInfo
        });
    }
}

module.exports = tourlCommand;