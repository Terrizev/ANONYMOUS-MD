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

    const mimeToExt = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'video/mp4': 'mp4',
        'audio/mpeg': 'mp3',
        'audio/ogg': 'ogg',
    };
    const mimeType = message.mimetype;
    let extension = mediaType;
    if (mimeType) {
        const subtype = mimeType.split('/')[1];
        extension = mimeToExt[mimeType] || subtype;
    }

    const filePath = path.join(__dirname, '../temp/', `${Date.now()}.${extension}`);
    fs.writeFileSync(filePath, buffer);
    return filePath;
}

async function tagCommand(sock, chatId, senderId, messageText, replyMessage) {
    const groupMetadata = await sock.groupMetadata(chatId);
    const participants = groupMetadata.participants;
    const mentionedJidList = participants.map(p => p.id);

    // If there's a replied message
    if (replyMessage) {
        let messageContent = {};

        if (replyMessage.imageMessage) {
            const filePath = await downloadMediaMessage(replyMessage.imageMessage, 'image');
            messageContent = {
                image: { url: filePath },
                caption: replyMessage.imageMessage.caption || '',
                mentions: mentionedJidList
            };
        } else if (replyMessage.videoMessage) {
            const filePath = await downloadMediaMessage(replyMessage.videoMessage, 'video');
            messageContent = {
                video: { url: filePath },
                caption: replyMessage.videoMessage.caption || '',
                mentions: mentionedJidList
            };
        } else if (replyMessage.conversation || replyMessage.extendedTextMessage) {
            const repliedText = replyMessage.conversation || replyMessage.extendedTextMessage.text;
            messageContent = {
                text: repliedText,
                mentions: mentionedJidList
            };
        } else if (replyMessage.documentMessage) {
            const filePath = await downloadMediaMessage(replyMessage.documentMessage, 'document');
            messageContent = {
                document: { url: filePath },
                fileName: replyMessage.documentMessage.fileName,
                mentions: mentionedJidList
            };
        } else if (replyMessage.audioMessage) {
            const filePath = await downloadMediaMessage(replyMessage.audioMessage, 'audio');
            const isPTT = replyMessage.audioMessage.ptt || false;
            messageContent = {
                audio: { url: filePath },
                mimetype: replyMessage.audioMessage.mimetype,
                ptt: isPTT,
                mentions: mentionedJidList
            };
        }

        if (Object.keys(messageContent).length > 0) {
            await sock.sendMessage(chatId, messageContent);
            return;
        }
    }

    // If user sends .tag with text (like .tag hello)
    if (messageText) {
        await sock.sendMessage(chatId, {
            text: messageText,
            mentions: mentionedJidList
        });
        return;
    }

    // If neither replied nor provided text
    await sock.sendMessage(chatId, { 
        text: "Please reply to a message to tag everyone with it, or use '.tag your_message'" 
    });
}

module.exports = tagCommand;
