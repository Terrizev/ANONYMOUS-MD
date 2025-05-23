async function shipCommand(sock, chatId, msg, groupMetadata) {
    try {
        const participants = await sock.groupMetadata(chatId);
        const ps = participants.participants.map(v => v.id);
        
        if (ps.length < 2) {
            await sock.sendMessage(chatId, { 
                text: '❌ Need at least 2 members to create a ship!' 
            });
            return;
        }

        let firstUser, secondUser;
        firstUser = ps[Math.floor(Math.random() * ps.length)];
        do {
            secondUser = ps[Math.floor(Math.random() * ps.length)];
        } while (secondUser === firstUser);

        const formatMention = id => '@' + id.split('@')[0];
        const shipPercentage = Math.floor(Math.random() * 41) + 60; // 60-100%
        const shipMessages = [
            { range: [90, 100], message: "🌟 Cosmic soulmates! 🌠\nThe stars align for this pair!" },
            { range: [80, 89], message: "💥 Electric chemistry! ⚡\nThese sparks are visible from space!" },
            { range: [70, 79], message: "🌹 Blossoming connection! 🌷\nThis could grow into something beautiful!" },
            { range: [60, 69], message: "🤝 Promising start! 👫\nWorth exploring this connection!" }
        ];

        const { message: shipComment } = shipMessages.find(({ range }) => 
            shipPercentage >= range[0] && shipPercentage <= range[1]
        );

        const text = `
🚀 *Love Connection* 🚀
━━━━━━━━━━━━━━━━━━━━
💘 ${formatMention(firstUser)} × ${formatMention(secondUser)} 💘
💞 Compatibility: ${shipPercentage}% 💞
━━━━━━━━━━━━━━━━━━━━
"${shipComment}"
━━━━━━━━━━━━━━━━━━━━
💝 ANONYMOUS-MD 💝
        `.trim();

        await sock.sendMessage(chatId, {
            text: text,
            mentions: [firstUser, secondUser],
            contextInfo: {
                mentionedJid: [firstUser, secondUser]
            }
        });

    } catch (error) {
        console.error('Ship command error:', error);
        await sock.sendMessage(chatId, { 
            text: '🚫 Failed to create ship! Please try again later.'
        });
    }
}

module.exports = shipCommand;