const axios = require('axios');

let handler = async (m, { text, conn, reply }) => {
    if (!text) return reply(`Usage example:\n!ytstalk VyleXdz`);

    try {
        let res = await axios.get(`https://api.siputzx.my.id/api/stalk/youtube?username=${encodeURIComponent(text)}`);
        if (!res.data.status) return reply(`Channel with username "${text}" not found.`);

        let ch = res.data.data.channel;
        let vids = res.data.data.latest_videos;

        let result = `📺 *YouTube Stalk*\n\n`;
        result += `👤 Username: ${ch.username}\n`;
        result += `📌 Subscribers: ${ch.subscriberCount}\n`;
        result += `🎬 Videos: ${ch.videoCount}\n`;
        result += `🔗 Channel: ${ch.channelUrl}\n\n`;
        result += `📝 Description:\n${ch.description || '-'}\n\n`;

        result += `🎥 *Latest 5 Videos*:\n`;
        vids.slice(0, 5).forEach((v, i) => {
            result += `\n${i + 1}. ${v.title}\n📅 ${v.publishedTime}\n👁️ ${v.viewCount}\n⏱️ ${v.duration}\n🔗 ${v.videoUrl}\n`;
        });

        await conn.sendMessage(m.chat, {
            image: { url: ch.avatarUrl },
            caption: result
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        reply('An error occurred while fetching YouTube data.');
    }
};

handler.command = ['ytstalk'];
handler.tags = ['stalk'];
handler.help = ['ytstalk <username>'];

module.exports = handler;