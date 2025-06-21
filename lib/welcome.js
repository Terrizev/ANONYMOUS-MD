const axios = require('axios');
const { addWelcome, delWelcome, isWelcomeOn, addGoodbye, delGoodBye, isGoodByeOn } = require('../lib/index');
const { delay } = require('@whiskeysockets/baileys');

async function handleWelcome(sock, chatId, message, match) {
    if (!match) {
        return sock.sendMessage(chatId, {
            text: `📥 *Welcome Message Setup*\n\nUse the following commands:\n\n✅ *.welcome on* — Enable welcome messages\n🚫 *.welcome off* — Disable welcome messages`,
            quoted: message
        });
    }

    const [command] = match.split(' ');
    const lowerCommand = command.toLowerCase();

    if (lowerCommand === 'on') {
        if (await isWelcomeOn(chatId)) {
            return sock.sendMessage(chatId, { text: '⚠️ Welcome messages are *already enabled*.', quoted: message });
        }
        await addWelcome(chatId, true, null);
        return sock.sendMessage(chatId, { text: '✅ Welcome messages *enabled*. New members will now receive a welcome greeting.', quoted: message });
    }

    if (lowerCommand === 'off') {
        if (!(await isWelcomeOn(chatId))) {
            return sock.sendMessage(chatId, { text: '⚠️ Welcome messages are *already disabled*.', quoted: message });
        }
        await delWelcome(chatId);
        return sock.sendMessage(chatId, { text: '✅ Welcome messages *disabled* for this group.', quoted: message });
    }

    // If no valid command is provided
    return sock.sendMessage(chatId, {
        text: `❌ Invalid command. Use:\n*.welcome on* - Enable\n*.welcome off* - Disable`,
        quoted: message
    });
}

async function handleGoodbye(sock, chatId, message, match) {
    const lower = match?.toLowerCase();

    if (!match) {
        return sock.sendMessage(chatId, {
            text: `📤 *Goodbye Message Setup*\n\nUse the following commands:\n\n✅ *.goodbye on* — Enable goodbye messages\n🚫 *.goodbye off* — Disable goodbye messages`,
            quoted: message
        });
    }

    if (lower === 'on') {
        if (await isGoodByeOn(chatId)) {
            return sock.sendMessage(chatId, { text: '⚠️ Goodbye messages are *already enabled*.', quoted: message });
        }
        await addGoodbye(chatId, true, null);
        return sock.sendMessage(chatId, { text: '✅ Goodbye messages *enabled*. Members will now receive a goodbye message when leaving.', quoted: message });
    }

    if (lower === 'off') {
        if (!(await isGoodByeOn(chatId))) {
            return sock.sendMessage(chatId, { text: '⚠️ Goodbye messages are *already disabled*.', quoted: message });
        }
        await delGoodBye(chatId);
        return sock.sendMessage(chatId, { text: '✅ Goodbye messages *disabled* for this group.', quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: `❌ Invalid command. Use:\n*.goodbye on* - Enable\n*.goodbye off* - Disable`,
        quoted: message
    });
}

// This would be used elsewhere in your code when someone joins/leaves
async function sendWelcomeMessage(sock, chatId, userJid, groupMetadata) {
    if (!await isWelcomeOn(chatId)) return;
    
    try {
        const profilePicture = await sock.profilePictureUrl(userJid, 'image');
        const groupName = groupMetadata.subject || "this group";
        
        await sock.sendMessage(chatId, {
            image: { url: profilePicture },
            caption: `🌟 Welcome @${userJid.split('@')[0]} to ${groupName}!\nWe're glad to have you here!`,
            mentions: [userJid]
        });
    } catch (error) {
        // If no profile picture, send text only
        const groupName = groupMetadata.subject || "this group";
        await sock.sendMessage(chatId, {
            text: `🌟 Welcome @${userJid.split('@')[0]} to ${groupName}!\nWe're glad to have you here!`,
            mentions: [userJid]
        });
    }
}

async function sendGoodbyeMessage(sock, chatId, userJid, groupMetadata) {
    if (!await isGoodByeOn(chatId)) return;
    
    try {
        const profilePicture = await sock.profilePictureUrl(userJid, 'image');
        const groupName = groupMetadata.subject || "this group";
        
        await sock.sendMessage(chatId, {
            image: { url: profilePicture },
            caption: `👋 Goodbye @${userJid.split('@')[0]}!\nThanks for being part of ${groupName}. We'll miss you!`,
            mentions: [userJid]
        });
    } catch (error) {
        // If no profile picture, send text only
        const groupName = groupMetadata.subject || "this group";
        await sock.sendMessage(chatId, {
            text: `👋 Goodbye @${userJid.split('@')[0]}!\nThanks for being part of ${groupName}. We'll miss you!`,
            mentions: [userJid]
        });
    }
}

module.exports = { 
    handleWelcome, 
    handleGoodbye,
    sendWelcomeMessage,
    sendGoodbyeMessage
};
