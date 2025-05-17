const { setAntilink, getAntilink, removeAntilink } = require('../lib/index');
const isAdmin = require('../lib/isAdmin');

async function handleAntilinkCommand(sock, chatId, userMessage, senderId, isSenderAdmin) {
    try {
        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, { text: '```For Group Admins Only!```' });
            return;
        }

        const prefix = '.';
        const args = userMessage.slice(9).toLowerCase().trim().split(' ');
        const action = args[0];
        const subAction = args[1];

        if (!action) {
            const usage = `\`\`\`ANTILINK SETUP\n\n${prefix}antilink on\n${prefix}antilink delete | kick | warn on\n${prefix}antilink off\n${prefix}antilink get\n\`\`\``;
            await sock.sendMessage(chatId, { text: usage });
            return;
        }

        switch (action) {
            case 'on':
                const existing = await getAntilink(chatId, 'on');
                if (existing) {
                    await sock.sendMessage(chatId, { text: '*_Antilink is already enabled_*' });
                    return;
                }
                const result = await setAntilink(chatId, 'on', 'delete');
                await sock.sendMessage(chatId, { 
                    text: result ? '*_Antilink enabled (Default: Delete action)_*' : '*_Failed to enable Antilink_*' 
                });
                break;

            case 'off':
                await removeAntilink(chatId, 'on');
                await sock.sendMessage(chatId, { text: '*_Antilink disabled_*' });
                break;

            case 'get':
                const config = await getAntilink(chatId, 'on');
                const status = config ? 'ENABLED' : 'DISABLED';
                const currentAction = config?.action || 'Not set';
                await sock.sendMessage(chatId, { 
                    text: `*_Antilink Status:_* ${status}\n*_Current Action:_* ${currentAction}` 
                });
                break;

            default:
                if (['delete', 'kick', 'warn'].includes(action)) {
                    if (subAction === 'on') {
                        const setResult = await setAntilink(chatId, 'on', action);
                        await sock.sendMessage(chatId, { 
                            text: setResult ? 
                                `*_Antilink enabled with ${action.toUpperCase()} action_*` : 
                                '*_Failed to update Antilink settings_*'
                        });
                    } else {
                        await sock.sendMessage(chatId, { 
                            text: `*_Invalid format. Use: ${prefix}antilink ${action} on_*`
                        });
                    }
                } else {
                    await sock.sendMessage(chatId, { 
                        text: `*_Invalid command. Use ${prefix}antilink for help_*`
                    });
                }
        }
    } catch (error) {
        console.error('Error in antilink command:', error);
        await sock.sendMessage(chatId, { text: '*_Error processing antilink command_*' });
    }
}

async function handleLinkDetection(sock, chatId, message, userMessage, senderId) {
    try {
        const action = await getAntilink(chatId, 'on');
        if (!action) return;

        const linkRegex = /https?:\/\/[^\s]+/;
        if (linkRegex.test(userMessage)) {
            // Check if user is admin
            const adminStatus = await isAdmin(chatId, senderId);
            if (adminStatus) return;

            const quotedMessageId = message.key.id;
            const quotedParticipant = message.key.participant || senderId;

            await sock.sendMessage(chatId, {
                delete: { 
                    remoteJid: chatId, 
                    fromMe: false, 
                    id: quotedMessageId, 
                    participant: quotedParticipant 
                }
            });

            const mentionedJidList = [senderId];
            let warningMessage = `@${senderId.split('@')[0]}, links are not allowed here🤧!`;

            switch (action.action) {
                case 'warn':
                    warningMessage += ' First warning!';
                    break;
                case 'kick':
                    warningMessage += 'user has been kicked!';
                    await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');
                    break;
                case 'delete':
                default:
                    warningMessage += ' Message deleted!';
                    break;
            }

            await sock.sendMessage(chatId, { 
                text: warningMessage, 
                mentions: mentionedJidList 
            });
        }
    } catch (error) {
        console.error('Error handling link detection:', error);
    }
}

module.exports = {
    handleAntilinkCommand,
    handleLinkDetection,
};