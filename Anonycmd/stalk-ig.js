const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Where is the Instagram Username?')

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/stalk/instagram?username=${encodeURIComponent(text)}`)
    let data = await res.json()
    if (!data.status) return m.reply('Instagram user not found!')

    let user = data.data
    let avatar = user.profile_pic_url

    let text = `
*Instagram Info ${user.username}*
📛 Full Name : ${user.full_name}
✍️ Bio : ${user.biography || 'None'}
🔗 External Link : ${user.external_url || 'None'}
👥 Followers : ${user.followers_count}
🔗 Following : ${user.following_count}
📝 Post Count : ${user.posts_count}
🔒 Private : ${user.is_private ? 'Yes' : 'No'}
🏢 Business Account : ${user.is_business_account ? 'Yes' : 'No'}
✅ Verified : ${user.is_verified ? 'Yes' : 'No'}
    `.trim()

    conn.sendMessage(m.chat, { image: { url: avatar }, caption: text }, { quoted: m })

  } catch (e) {
    console.log(e)
    m.reply('An error occurred while fetching data.')
  }
}

// Can be called with multiple keywords
handler.command = ['instagramstalk', 'igstalk']
handler.tags = ['stalk']

module.exports = handler