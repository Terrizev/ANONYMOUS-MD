const fs = require('fs');
const path = require('path');
const isAdmin = require('../lib/isAdmin');

// Define paths
const databaseDir = path.join(process.cwd(), 'data');
const warningsPath = path.join(databaseDir, 'warnings.json');

// Initialize warnings file if it doesn't exist
function initializeWarningsFile() {
    if (!fs.existsSync(databaseDir)) {
        fs.mkdirSync(databaseDir, { recursive: true });
    }
    if (!fs.existsSync(warningsPath)) {
        fs.writeFileSync(warningsPath, JSON.stringify({}), 'utf8');
    }
}

async function warnCommand(sock, chatId, senderId, mentionedJids, message) {
    try {
        initializeWarningsFile();

        if (!chatId.endsWith('@g.us')) {
            await sock.sendMessage(chatId, { text: 'This command can only be used in groups!' });
            return;
        }

        try {
            const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
            if (!isBotAdmin) {
                await sock.sendMessage(chatId, { text: 'Please make the bot an admin first to use this command.' });
                return;
            }
            if (!isSenderAdmin) {
                await sock.sendMessage(chatId, { text: 'Only group admins can use the warn command.' });
                return;
            }
        } catch (adminError) {
            console.error('Error checking admin status:', adminError);
            await sock.sendMessage(chatId, { text: 'Please make sure the bot is an admin of this group.' });
            return;
        }

        let userToWarn;
        if (mentionedJids && mentionedJids.length > 0) {
            userToWarn = mentionedJids[0];
        } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToWarn = message.message.extendedTextMessage.contextInfo.participant;
        }

        if (!userToWarn) {
            await sock.sendMessage(chatId, { text: 'Please mention the user or reply to their message to warn!' });
            return;
        }

        // Extract reason from message text
        const messageText = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
        const parts = messageText.split(/\s+/).filter(p => p);
        parts.shift(); // Remove the command ("/warn")
        if (mentionedJids && mentionedJids.length > 0) parts.shift(); // Remove mention if present
        const reason = parts.join(' ').trim() || 'Not specified';

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            let warnings = {};
            try {
                warnings = JSON.parse(fs.readFileSync(warningsPath, 'utf8'));
            } catch (error) {
                warnings = {};
            }

            if (!warnings[chatId]) warnings[chatId] = {};
            if (!warnings[chatId][userToWarn]) warnings[chatId][userToWarn] = 0;
            warnings[chatId][userToWarn]++;
            fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));

            const warningMessage = 
`⚠️┳━━━━━━━━━━━━━━━┳⚠️
  ┃  🚨 *GROUP WARNING* 🚨 ┃
  ┗━━━━━━━━━━━━━━━━┛

▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
🆔 *User:* @${userToWarn.split('@')[0]}
🔢 *Warnings:* [${'■'.repeat(warnings[chatId][userToWarn])}${'□'.repeat(3 - warnings[chatId][userToWarn])}] ${warnings[chatId][userToWarn]}/3
👮♂️ *Moderator:* @${senderId.split('@')[0]}
📛 *Reason:* ${reason}

⏰ *Server Time:* ${new Date().toLocaleTimeString()}
📅 *Date:* ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
🚫 *Next violation:* Temporary mute
🔔 *Note:* Repeated offenses may lead to ban`;

            await sock.sendMessage(chatId, { 
                text: warningMessage,
                mentions: [userToWarn, senderId]
            });

            // Auto-kick after 3 warnings
            if (warnings[chatId][userToWarn] >= 3) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await sock.groupParticipantsUpdate(chatId, [userToWarn], "remove");
                delete warnings[chatId][userToWarn];
                fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
                const kickMessage = `*『 AUTO-KICK 』*\n\n` +
                    `@${userToWarn.split('@')[0]} has been removed from the group after receiving 3 warnings! ⚠️`;
                await sock.sendMessage(chatId, { text: kickMessage, mentions: [userToWarn] });
            }
        } catch (error) {
            console.error('Error in warn command:', error);
            await sock.sendMessage(chatId, { text: '❌ Failed to warn user!' });
        }
    } catch (error) {
        console.error('Error in warn command:', error);
        // Handle rate limiting and other errors as before
    }
}

module.exports = warnCommand;