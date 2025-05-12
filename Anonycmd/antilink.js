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

        if (!action) {
            const usage = `\`\`\`ANTILINK SETUP\n\n${prefix}antilink on\n${prefix}antilink set delete | kick | warn\n${prefix}antilink off\n\`\`\``;
            await sock.sendMessage(chatId, { text: usage });
            return;
        }

        switch (action) {
            case 'on':
                const existingAction = await getAntilink(chatId, 'on');
                if (existingAction) {
                    await sock.sendMessage(chatId, { text: '*_Antilink is already on_*' });
                    return;
                }
                const result = await setAntilink(chatId, 'on', 'delete');
                await sock.sendMessage(chatId, { 
                    text: result ? '*_Antilink has been turned ON_*' : '*_Failed to turn on Antilink_*' 
                });
                break;

            case 'off':
                await removeAntilink(chatId, 'on');
                await sock.sendMessage(chatId, { text: '*_Antilink has been turned OFF_*' });
                break;

            case 'set':
                if (args.length < 2) {
                    await sock.sendMessage(chatId, { 
                        text: `*_Please specify an action: ${prefix}antilink set delete | kick | warn_*` 
                    });
                    return;
                }
                const setAction = args[1];
                if (!['delete', 'kick', 'warn'].includes(setAction)) {
                    await sock.sendMessage(chatId, { 
                        text: '*_Invalid action. Choose delete, kick, or warn._*' 
                    });
                    return;
                }
                const setResult = await setAntilink(chatId, 'on', setAction);
                await sock.sendMessage(chatId, { 
                    text: setResult ? `*_Antilink action set to ${setAction}_*` : '*_Failed to set Antilink action_*' 
                });
                break;

            case 'get':
                const currentAction = await getAntilink(chatId, 'on');
                const status = currentAction ? 'ON' : 'OFF';
                await sock.sendMessage(chatId, { 
                    text: `*_Antilink Configuration:_*\nStatus: ${status}\nAction: ${currentAction || 'None'}` 
                });
                break;

            default:
                await sock.sendMessage(chatId, { text: `*_Use ${prefix}antilink for usage._*` });
        }
    } catch (error) {
        console.error('Error in antilink command:', error);
        await sock.sendMessage(chatId, { text: '*_Error processing antilink command_*' });
    }
}

async function handleLinkDetection(sock, chatId, message, userMessage, senderId) {
    try {
        const action = await getAntilink(chatId, 'on');
        if (!action) return; // Antilink is off

        const linkRegex = /https?:\/\/[^\s]+/;
        if (linkRegex.test(userMessage)) {
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
            let warningMessage = `@${senderId.split('@')[0]}, posting links is not allowed.`;

            switch (action) {
                case 'warn':
                    warningMessage += ' This is a warning.';
                    break;
                case 'kick':
                    warningMessage += ' You have been kicked.';
                    await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');
                    break;
                case 'delete':
                default:
                    warningMessage += ' Message deleted.';
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