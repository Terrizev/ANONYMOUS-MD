const { isAdmin } = require('../lib/isAdmin');
const { getFormattedDate } = require('../lib/helpers');

async function promoteCommand(sock, chatId, mentionedJids, message) {
    try {
        const groupMetadata = await sock.groupMetadata(chatId);
        const promoterJid = sock.user.id;
        let userToPromote = [];

        // User detection logic
        if (mentionedJids?.length > 0) {
            userToPromote = mentionedJids;
        } else if (message?.message?.extendedTextMessage?.contextInfo?.participant) {
            userToPromote = [message.message.extendedTextMessage.contextInfo.participant];
        } else {
            return await sock.sendMessage(chatId, {
                text: '⚠️ *Promotion Error*\nPlease mention users or reply to their message!',
                mentions: []
            });
        }

        // Execute promotion
        await sock.groupParticipantsUpdate(chatId, userToPromote, "promote");

        // Generate promotion message
        const formattedDate = getFormattedDate();
        const [groupName, promoterName] = await Promise.all([
            getGroupName(groupMetadata),
            getUsername(sock, promoterJid)
        ]);
        
        const promotedUsers = await Promise.all(
            userToPromote.map(jid => getUsername(sock, jid))
        );

        const promotionMessage = createPromotionMessage({
            groupName,
            promoterName,
            promotedUsers,
            date: formattedDate,
            isManual: true
        });

        await sock.sendMessage(chatId, {
            text: promotionMessage,
            mentions: [...userToPromote, promoterJid],
            contextInfo: { mentionedJid: [...userToPromote, promoterJid] }
        });

    } catch (error) {
        console.error('Promote command error:', error);
        await sock.sendMessage(chatId, {
            text: error.isCommandError ? error.message : '🚨 Failed to promote. Please check permissions!'
        });
    }
}

async function handlePromotionEvent(sock, groupId, participants, author) {
    try {
        const groupMetadata = await sock.groupMetadata(groupId);
        const mentionList = [...participants];
        let promoterName = 'System';

        if (author) {
            mentionList.push(author);
            promoterName = await getUsername(sock, author);
        }

        const promotedUsers = await Promise.all(
            participants.map(jid => getUsername(sock, jid))
        );

        const promotionMessage = createPromotionMessage({
            groupName: groupMetadata.subject,
            promoterName,
            promotedUsers,
            date: getFormattedDate(),
            isManual: false
        });

        await sock.sendMessage(groupId, {
            text: promotionMessage,
            mentions: mentionList,
            contextInfo: { mentionedJid: mentionList }
        });

    } catch (error) {
        console.error('Promotion event error:', error);
    }
}

// Helper functions
async function getUsername(sock, jid) {
    try {
        const contact = await sock.onWhatsApp(jid);
        return contact[0]?.name || `@${jid.split('@')[0]}`;
    } catch {
        return `@${jid.split('@')[0]}`;
    }
}

function getGroupName(metadata) {
    return metadata.subject || 'Unknown Group';
}

function createPromotionMessage({ groupName, promoterName, promotedUsers, date, isManual }) {
    const celebrationEmoji = ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)];
    
    return `
${celebrationEmoji} *GROUP PROMOTION NOTICE* ${celebrationEmoji}
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
🏛️ *Group:* ${groupName}
📅 *Date:* ${date}

👑 *Promoted By:*
${promoterName}

🚀 *New Admin${promotedUsers.length > 1 ? 's' : ''}:*
${promotedUsers.map((u, i) => `▸ ${u}`).join('\n')}
    `.trim();
}

module.exports = { promoteCommand, handlePromotionEvent };