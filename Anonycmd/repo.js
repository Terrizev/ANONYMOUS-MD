const axios = require('axios');

let handler = async (m, { conn }) => {
  try {
    const repoUrl = 'https://api.github.com/repos/Terrizev/ANONYMOUS-MD';
    const response = await axios.get(repoUrl);
    const repoData = response.data;

    const stars = repoData.stargazers_count || 0;
    const forks = repoData.forks_count || 0;
    const watchers = repoData.watchers_count || 0;
    const license = repoData.license ? repoData.license.name : 'None';

    const caption = `*🔹 BOT REPOSITORY 🔹*\n\n` +
                   `🔸 *Name:* ${repoData.name}\n` +
                   `🔸 *Stars:* ${stars}\n` +
                   `🔸 *Forks:* ${forks}\n` +
                   `🔸 *Watchers:* ${watchers}\n` +
                   `🔸 *Language:* JavaScript\n` +
                   `🔸 *License:* ${license}\n` +
                   `🔸 *GitHub Link:* ${repoData.html_url}\n\n` +
                   `👋@${m.sender.split('@')[0]}, Don't forget to star and fork my repository!`;

    conn.sendMessage(m.chat, { 
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: repoData.name,
          body: '⭐ Star this repository on GitHub!',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/91n3vx.jpg',
          sourceUrl: repoData.html_url
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply('Failed to fetch repository information.');
  }
};

handler.help = ['repo', 'sc'];
handler.tags = ['main'];
handler.command = ['repo', 'file'];

module.exports = handler;