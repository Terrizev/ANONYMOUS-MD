const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Where is the TikTok Username?')

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(text)}`)
    let data = await res.json()
    if (!data.status) return m.reply('TikTok user not found!')

    let user = data.data.user
    let stats = data.data.stats
    let avatar = user.avatarLarger

    let text = `
*TikTok Info ${user.uniqueId}*
📛 Nickname : ${user.nickname}
🆔 User ID : ${user.id}
👥 Followers : ${stats.followerCount}
🔗 Following : ${stats.followingCount}
❤️ Likes : ${stats.heartCount}
🎥 Video Count : ${stats.videoCount}
✍️ Bio : ${user.signature || 'None'}
🔒 Private : ${user.privateAccount ? 'Yes' : 'No'}
    `.trim()

    conn.sendMessage(m.chat, { image: { url: avatar }, caption: text }, { quoted: m })

  } catch (e) {
    console.log(e)
    m.reply('An error occurred while fetching data.')
  }
}

handler.command = ['tiktokstalk', 'ttstalk']
handler.tags = ['stalk']

module.exports = handler