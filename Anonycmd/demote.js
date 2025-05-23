const isAdmin = require('../lib/isAdmin');

async function demoteCommand(sock, chatId, mentionedJids, message) {
    try {
        // First check if it's a group
        if (!chatId.endsWith('@g.us')) {
            await sock.sendMessage(chatId, { 
                text: 'This command can only be used in groups!'
            });
            return;
        }

        // Check admin status first, before any other operations
        try {
            const adminStatus = await isAdmin(sock, chatId, message.key.participant || message.key.remoteJid);
            
            if (!adminStatus.isBotAdmin) {
                await sock.sendMessage(chatId, { 
                    text: '⚠️ Error: Please make the bot an admin first to use this command.'
                });
                return;
            }

            if (!adminStatus.isSenderAdmin) {
                await sock.sendMessage(chatId, { 
                    text: '⚠️ Error: Only group admins can use the demote command.'
                });
                return;
            }
        } catch (adminError) {
            console.error('Error checking admin status:', adminError);
            await sock.sendMessage(chatId, { 
                text: '⚠️ Error: Please make sure the bot is an admin of this group.'
            });
            return;
        }

        let userToDemote = [];
        
        // Check for mentioned users
        if (mentionedJids && mentionedJids.length > 0) {
            userToDemote = mentionedJids;
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToDemote = [message.message.extendedTextMessage.contextInfo.participant];
        }
        
        // If no user found through either method
        if (userToDemote.length === 0) {
            await sock.sendMessage(chatId, { 
                text: '⚠️ Error: Please mention the user or reply to their message to demote!'
            });
            return;
        }

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.groupParticipantsUpdate(chatId, userToDemote, "demote");
        
        // Get usernames for each demoted user
        const usernames = await Promise.all(userToDemote.map(async jid => {
            return `@${jid.split('@')[0]}`;
        }));

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        const demotionMessage = `⬇️ *GROUP DEMOTION NOTICE* ⬇️
━━━━━━━━━━━━━━━━━━━━━━

👥 *Demoted ${userToDemote.length > 1 ? 'Users' : 'User'} (${userToDemote.length})*
${usernames.map((name, index) => `▫️ ${index + 1}. ${name}`).join('\n')}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🛡️ *Admin Action By* 
@${message.key.participant?.split('@')[0] || message.key.remoteJid.split('@')[0]}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
📆 *Date:* ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
⏰ *Time:* ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}

━━━━━━━━━━━━━━━━━━━━━━
⚠️ Group roles have been updated`;

// For 12-hour format with AM/PM
        
        await sock.sendMessage(chatId, { 
            text: demotionMessage,
            mentions: [...userToDemote, message.key.participant || message.key.remoteJid]
        });
    } catch (error) {
        console.error('Error in demote command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await sock.sendMessage(chatId, { 
                    text: '⚠️ Rate limit reached. Please try again in a few seconds.'
                });
            } catch (retryError) {
                console.error('Error sending retry message:', retryError);
            }
        } else {
            try {
                await sock.sendMessage(chatId, { 
                    text: '⚠️ Failed to demote user(s). Make sure the bot is admin and has sufficient permissions.'
                });
            } catch (sendError) {
                console.error('Error sending error message:', sendError);
            }
        }
    }
}

// Function to handle automatic demotion detection
async function handleDemotionEvent(sock, groupId, participants, author) {
    try {
        if (!groupId || !participants) {
            console.log('Invalid groupId or participants:', { groupId, participants });
            return;
        }

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get usernames for demoted participants
        const demotedUsernames = await Promise.all(participants.map(async jid => {
            return `@${jid.split('@')[0]}`;
        }));

        let demotedBy;
        let mentionList = [...participants];

        if (author && author.length > 0) {
            // Ensure author has the correct format
            const authorJid = author;
            demotedBy = `@${authorJid.split('@')[0]}`;
            mentionList.push(authorJid);
        } else {
            demotedBy = 'System';
        }

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        const demotionMessage = `⬇️ *GROUP DEMOTION NOTICE* ⬇️
━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 *Demoted ${participants.length > 1 ? 'Users' : 'User'} (${participants.length})*
${demotedUsernames.map((name, index) => `▫️ ${participants.length > 1 ? `${index + 1}. ` : ''}${name}`).join('\n')}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🛡️ *Action Performed By* 
${demotedBy.includes('@') ? demotedBy : `@${demotedBy}`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
📆 *Date:* ${new Date().toLocaleDateString('en-US', { 
  weekday: 'short', 
  month: 'long', 
  day: 'numeric',
  year: 'numeric' 
})}
⏰ *Time:* ${new Date().toLocaleTimeString('en-US', { 
  hour: '2-digit', 
  minute: '2-digit', 
  hour12: true 
})}

━━━━━━━━━━━━━━━━━━━━━━
⚠️ Group authority levels have been modified`;
        
        await sock.sendMessage(groupId, {
            text: demotionMessage,
            mentions: mentionList
        });
    } catch (error) {
        console.error('Error handling demotion event:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

module.exports = { demoteCommand, handleDemotionEvent };
