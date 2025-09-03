const fs = require("fs")

const handler = async (m, { conn, isCreator, prefix, isPremium, pushname } = {}) => {

const SendButton = async (teks) => {
await conn.sendMessage(m.chat, { 
  headerType: 1,
    image: { url: "https://files.catbox.moe/91n3vx.jpg" }, //thumb di bawah\\
    caption: teks,
    footer: "© ᴀɴᴏɴʏᴍᴏᴜs ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ",
    contextInfo: {
      mentionedJid: [m.sender, '0@s.whatsapp.net', isCreator[0] + '@s.whatsapp.net'],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363397100406773@newsletter',
        serverMessageId: null,
        newsletterName: 'Aɴᴏɴʏᴍᴏᴜs ᴍᴅ'
}
  }
}, { quoted: m })
}

const teks = ` 
        \`[ Anonymous bot ]\`
[✦]  botmode: ${conn.public ? "Public" : "Self"}
[✦]  version: V5.0.0
[✦]  status user: ${isCreator ? 'owner' : isPremium ? 'ᴘʀᴇᴍɪᴜᴍ' : 'ғʀᴇᴇ'}

❖ [ *\`CONVERT MENU\`* ]
│ ◆ ${prefix}wm
│ ◆ ${prefix}brat <teks>
│ ◆ ${prefix}bratvid <teks>
│ ◆ ${prefix}smeme
│ ◆ ${prefix}sticker
│ ◆ ${prefix}hd
│ ◆ ${prefix}toimg
│ ◆ ${prefix}removebg
│ ◆ ${prefix}tourl
│ ◆ ${prefix}deepimg
│ ◆ ${prefix}rvo
│ ◆ ${prefix}web2app
│ ◆ ${prefix}sfileup
│ ◆ ${prefix}tohijab
│ ◆ ${prefix}hitamkan
╰─────────╾`
return SendButton(teks)
}

handler.command = ["convertmenu"]
module.exports = handler