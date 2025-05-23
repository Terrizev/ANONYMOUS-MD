async function githubCommand(sock, chatId) {
    const repoInfo = `*🤖 ANONYMOUS MD*

*📂 GitHub Repository:*
https://github.com/Terrizev/ANONYMOUS-MD/fork  

*📢 Official Channel:*
https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y
_Star ⭐ the repository if you like the bot!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand;
