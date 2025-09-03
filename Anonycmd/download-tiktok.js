const { tiktokDownloaderVideo } = require('../lib/scrape/tiktok')
const sleep = ms => new Promise(r => setTimeout(r, ms))

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`Example:\n${command} <TikTok URL>`)

  try {
    m.reply('⏳ Please wait, fetching TikTok data...')
    let anu = await tiktokDownloaderVideo(text)
    let item = 0

    for (let imgs of anu.data) {
      if (imgs.type === "nowatermark") {
        await conn.sendMessage(m.chat, {
          video: { url: imgs.url },
          caption: `🎥 *Video Info*:
📍 Region: ${anu.region}
⏳ Duration: ${anu.duration}
📅 Taken: ${anu.taken_at}

📊 *Statistics*:
👁️ Views: ${anu.stats.views}
❤️ Likes: ${anu.stats.likes}
💬 Comments: ${anu.stats.comment}
🔄 Shares: ${anu.stats.share}
📥 Downloads: ${anu.stats.download}

👤 *Author*:
📝 Fullname: ${anu.author.fullname}
🏷️ Nickname: ${anu.author.nickname}

🎵 *Music*:
🎼 Title: ${anu.music_info.title}
🎤 Artist: ${anu.music_info.author}
💿 Album: ${anu.music_info.album}

📝 *Caption*:
${anu.title || 'No Caption'}`
        }, { quoted: m })
      }

      if (imgs.type === "photo") {
        if (item === 0) {
          await conn.sendMessage(m.chat, {
            image: { url: imgs.url },
            caption: `🖼️ *Photo Info*:
📍 Region: ${anu.region}
📅 Taken: ${anu.taken_at}

📊 *Statistics*:
👁️ Views: ${anu.stats.views}
❤️ Likes: ${anu.stats.likes}
💬 Comments: ${anu.stats.comment}
🔄 Shares: ${anu.stats.share}
📥 Downloads: ${anu.stats.download}

👤 *Author*:
📝 Fullname: ${anu.author.fullname}
🏷️ Nickname: ${anu.author.nickname}

🎵 *Music*:
🎼 Title: ${anu.music_info.title}
🎤 Artist: ${anu.music_info.author}
💿 Album: ${anu.music_info.album}

📝 *Caption*:
${anu.title || 'No Caption'}${m.isGroup ? anu.data.length > 1 ? "\n📥 _Remaining photos sent to private chat_\n" : "\n" : "\n"}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇʀʀɪ`
          }, { quoted: m })
        } else {
          await conn.sendMessage(m.sender, {
            image: { url: imgs.url }
          }, { quoted: m })
        }
        item++
        await sleep(2000)
      }
    }
  } catch (err) {
    console.error(err)
    m.reply('⚠️ Failed to fetch data from TikTok. Please ensure the URL is valid or try again later.')
  }
}

handler.command = ['tiktok', 'tt', 'ttnowm', 'tiktoknowm', 'tiktokslide', 'ttslide', 'tiktokfoto', 'tiktokmp4']
handler.tags = ['download']

module.exports = handler