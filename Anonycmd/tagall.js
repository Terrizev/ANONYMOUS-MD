const isAdmin = require('../lib/isAdmin');

async function tagAllCommand(sock, chatId, senderId) {
    try {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
        
        if (!isSenderAdmin && !isBotAdmin) {
            await sock.sendMessage(chatId, {
                text: '🚫 *Admin Only Command*\nOnly group admins can use the .tagall feature.'
            });
            return;
        }

        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        if (!participants || participants.length === 0) {
            await sock.sendMessage(chatId, { text: '❌ No members found in this group.' });
            return;
        }

        // Enhanced message design
        let message = `📢 *GROUP MENTION ALERT* 📢\n`;
        message += `_In *${groupMetadata.subject}*_\n\n`;
        message += `🌐 *Total Members: ${participants.length}*\n\n`;
        message += '════════════════════\n';

        participants.forEach((participant, index) => {
            message += `${index + 1} ➤ @${participant.id.split('@')[0]}\n`;
        });

        message += '\n════════════════════\n';
        message += '💡 *Please use mentions responsibly*';

        await sock.sendMessage(chatId, {
            text: message,
            mentions: participants.map(p => p.id)
        });

    } catch (error) {
        console.error('Tagall error:', error);
        await sock.sendMessage(chatId, { 
            text: '⚠️ Failed to tag members. Please try again later.'
        });
    }
}

module.exports = tagAllCommand;