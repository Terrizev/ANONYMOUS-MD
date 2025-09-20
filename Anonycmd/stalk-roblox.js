const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Where is the Roblox Username?')

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/stalk/roblox?user=${encodeURIComponent(text)}`)
    let data = await res.json()
    if (!data.status) return m.reply('User not found!')

    let user = data.data.basic
    let avatar = data.data.avatar.headshot.data[0].imageUrl
    let friends = data.data.social.friends.count
    let followers = data.data.social.followers.count
    let following = data.data.social.following.count
    let created = new Date(user.created).toLocaleDateString()
    let primaryGroup = data.data.groups.primary.group.name
    let badges = data.data.achievements.robloxBadges
      ? data.data.achievements.robloxBadges.map(b => b.name).join(', ')
      : 'None'

    let text = `
*Roblox Info ${user.name}*
📛 Display Name : ${user.displayName}
🆔 User ID : ${user.userId}
📅 Account Created : ${created}
👥 Friends : ${friends}
👤 Followers : ${followers}
🔗 Following : ${following}
🏆 Badges : ${badges}
👕 Primary Group : ${primaryGroup}
    `.trim()

    conn.sendMessage(m.chat, { image: { url: avatar }, caption: text }, { quoted: m })
    
  } catch (e) {
    console.log(e)
    m.reply('An error occurred while fetching data.')
  }
}

handler.command = ['robloxstalk']
handler.tags = ['stalk']

module.exports = handler