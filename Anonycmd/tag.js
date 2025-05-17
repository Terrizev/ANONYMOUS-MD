const isAdmin = require('../lib/isAdmin');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

async function downloadMediaMessage(message, mediaType) {
    const stream = await downloadContentFromMessage(message, mediaType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    // Determine the file extension based on MIME type
    const mimeToExt = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'video/mp4': 'mp4',
        'audio/mpeg': 'mp3',
        'audio/ogg': 'ogg',
        // Add more MIME types and extensions as needed
    };
    const mimeType = message.mimetype;
    let extension = mediaType; // Default to mediaType if no MIME type found
    if (mimeType) {
        const subtype = mimeType.split('/')[1];
        extension = mimeToExt[mimeType] || subtype;
    }

    const filePath = path.join(__dirname, '../temp/', `${Date.now()}.${extension}`);
    fs.writeFileSync(filePath, buffer);
    return filePath;
}

async function tagCommand(sock, chatId, senderId, messageText, replyMessage) {
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isBotAdmin) {
        await sock.sendMessage(chatId, { text: 'Please make the bot an admin first.' });
        return;
    }

    if (!isSenderAdmin) {
        const stickerPath = './assets/sticktag.webp';
        if (fs.existsSync(stickerPath)) {
            const stickerBuffer = fs.readFileSync(stickerPath);
            await sock.sendMessage(chatId, { sticker: stickerBuffer });
        }
        return;
    }

    const groupMetadata = await sock.groupMetadata(chatId);
    const participants = groupMetadata.participants;
    const mentionedJidList = participants.map(p => p.id);

    if (replyMessage) {
        let messageContent = {};

        if (replyMessage.imageMessage) {
            const filePath = await downloadMediaMessage(replyMessage.imageMessage, 'image');
            messageContent = {
                image: { url: filePath },
                caption: messageText || replyMessage.imageMessage.caption || '',
                mentions: mentionedJidList
            };
        } else if (replyMessage.videoMessage) {
            const filePath = await downloadMediaMessage(replyMessage.videoMessage, 'video');
            messageContent = {
                video: { url: filePath },
                caption: messageText || replyMessage.videoMessage.caption || '',
                mentions: mentionedJidList
            };
        } else if (replyMessage.conversation || replyMessage.extendedTextMessage) {
            messageContent = {
                text: replyMessage.conversation || replyMessage.extendedTextMessage.text,
                mentions: mentionedJidList
            };
        } else if (replyMessage.documentMessage) {
            const filePath = await downloadMediaMessage(replyMessage.documentMessage, 'document');
            messageContent = {
                document: { url: filePath },
                fileName: replyMessage.documentMessage.fileName,
                caption: messageText || '',
                mentions: mentionedJidList
            };
        } else if (replyMessage.audioMessage) {
            const filePath = await downloadMediaMessage(replyMessage.audioMessage, 'audio');
            const isPTT = replyMessage.audioMessage.ptt || false;
            messageContent = {
                audio: { url: filePath },
                mimetype: replyMessage.audioMessage.mimetype,
                ptt: isPTT,
                caption: messageText || '',
                mentions: mentionedJidList
            };
        }

        if (Object.keys(messageContent).length > 0) {
            await sock.sendMessage(chatId, messageContent);
        }
    } else {
        await sock.sendMessage(chatId, {
            text: messageText || "Tagged message",
            mentions: mentionedJidList
        });
    }
}

module.exports = tagCommand;