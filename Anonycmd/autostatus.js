const fs = require('fs');
const path = require('path');
const settings = require('../settings');

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363397100406773@newsletter',
            newsletterName: 'ANONYMOUS-MD',
            serverMessageId: -1
        }
    }
};

const configPath = path.join(__dirname, '../data/autoStatus.json');

// Initialize config file if missing
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ enabled: false }));
}

async function autoStatusCommand(sock, chatId, msg, args) {
    try {
        let config = JSON.parse(fs.readFileSync(configPath));

        if (!args || args.length === 0) {
            const status = config.enabled ? 'enabled' : 'disabled';
            await sock.sendMessage(chatId, { 
                text: `🔄 *Auto Status View*\n\nCurrent status: ${status}\n\nUse:\n.autostatus on - Enable\n.autostatus off - Disable`,
                ...channelInfo
            });
            return;
        }

        const command = args[0].toLowerCase();
        if (command === 'on') {
            config.enabled = true;
            fs.writeFileSync(configPath, JSON.stringify(config));
            await sock.sendMessage(chatId, { 
                text: '✅ Auto status view enabled!\nBot will now automatically view statuses.',
                ...channelInfo
            });
        } else if (command === 'off') {
            config.enabled = false;
            fs.writeFileSync(configPath, JSON.stringify(config));
            await sock.sendMessage(chatId, { 
                text: '❌ Auto status view disabled!\nBot will stop viewing statuses.',
                ...channelInfo
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: '❌ Invalid command! Use .autostatus on/off',
                ...channelInfo
            });
        }

    } catch (error) {
        console.error('AutoStatus Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Auto status error: ' + error.message,
            ...channelInfo
        });
    }
}

function isAutoStatusEnabled() {
    try {
        return JSON.parse(fs.readFileSync(configPath)).enabled;
    } catch (error) {
        console.error('Config Read Error:', error);
        return false;
    }
}

async function handleStatusUpdate(sock, status) {
    try {
        if (!isAutoStatusEnabled()) return;
        
        // Rate limit protection
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Improved status detection
        const statusMessage = status.messages?.[0]?.message || status.message;
        let statusType = '';

        if (statusMessage?.imageMessage || statusMessage?.viewOnceMessage?.imageMessage) {
            statusType = 'image';
        } else if (statusMessage?.videoMessage || statusMessage?.viewOnceMessage?.videoMessage) {
            statusType = 'video';
        } else if (statusMessage?.audioMessage) {
            statusType = 'audio';
        } else if (statusMessage?.conversation || statusMessage?.extendedTextMessage) {
            statusType = 'text';
        }

        const validTypes = ['image', 'video', 'audio', 'text'];
        if (!validTypes.includes(statusType)) {
            console.log(`Skipping unsupported format: ${statusType || 'document/sticker'}`);
            return;
        }

        // Validate emoji configuration
        const isValidEmoji = settings.statusReactionEmoji && 
                           /^\p{Emoji}$/u.test(settings.statusReactionEmoji);
        
        // Get status key
        const statusKey = status.messages?.[0]?.key || status.key;
        if (!statusKey || statusKey.remoteJid !== 'status@broadcast') return;

        try {
            // Always view the status
            await sock.readMessages([statusKey]);

            // Only react if emoji is valid
            if (isValidEmoji) {
                await sock.sendMessage(statusKey.remoteJid, {
                    reaction: {
                        key: statusKey,
                        text: settings.statusReactionEmoji
                    }
                });
            }
            
        } catch (error) {
            if (error.message.includes('rate-overlimit')) {
                console.log('Rate limited, retrying in 10s...');
                await new Promise(resolve => setTimeout(resolve, 10000));
                await sock.readMessages([statusKey]);
            } else {
                console.error('Status Reaction Error:', error.message);
            }
        }

    } catch (error) {
        console.error('Auto Status View Error:', error.message);
    }
}

module.exports = {
    autoStatusCommand,
    handleStatusUpdate
};