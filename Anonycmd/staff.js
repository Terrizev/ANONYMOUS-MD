async function staffCommand(sock, chatId, msg) {
    try {
        const groupMetadata = await sock.groupMetadata(chatId);
        
        // Get group profile picture
        let pp;
        try {
            pp = await sock.profilePictureUrl(chatId, 'image');
        } catch {
            pp = 'https://i.imgur.com/2wzGhpF.jpeg';
        }

        // Extract participants and admins
        const participants = groupMetadata.participants;
        const groupAdmins = participants.filter(p => p.admin);
        const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || participants[0]?.id;

        // Format creation date
        const creationDate = new Date(groupMetadata.creation * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create structured text
        const text = `
🌟 *GROUP ADMINS* 🌟
╭───────────────────────────
│   *${groupMetadata.subject}*
│   📅 Created: ${creationDate}
╰───────────────────────────

👑 *Group Owner*:
⦿ @${owner.split('@')[0]}

🔐 *Administrators* (${groupAdmins.length}):
${groupAdmins.map((v, i) => `🛡️ ${i + 1}. @${v.id.split('@')[0]}`).join('\n')}
`.trim();

        // Send message with mentions
        await sock.sendMessage(chatId, {
            image: { url: pp },
            caption: text,
            mentions: [...groupAdmins.map(v => v.id), owner],
            contextInfo: {
                mentionedJid: [...groupAdmins.map(v => v.id), owner]
            }
        });

    } catch (error) {
        console.error('Staff command error:', error);
        await sock.sendMessage(chatId, { 
            text: '⚠️ Failed to retrieve staff information. Please try again later.'
        });
    }
}

module.exports = staffCommand;