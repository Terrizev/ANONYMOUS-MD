const fs = require("fs")

const handler = async (m, { conn, isCreator, prefix, isPremium, pushname } = {}) => {

const SendButton = async (teks) => {
await conn.sendMessage(m.chat, { 
  headerType: 1,
    image: { url: "https://files.catbox.moe/91n3vx.jpg" }, //thumb di bawah\\
    caption: teks,
    footer: "© Anonymous ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ",
    contextInfo: {
      mentionedJid: [m.sender, '0@s.whatsapp.net', isCreator[0] + '@s.whatsapp.net'],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363397100406773@newsletter',
        serverMessageId: null,
        newsletterName: 'Anonymous ᴍᴅ'
}
  }
}, { quoted: m })
}

const teks = ` 
         \`[ Anonymous bot ]\`
[✦]  botmode: ${conn.public ? "Public" : "Self"}
[✦]  version: V5.0.0
[✦]  status user: ${isCreator ? 'owner' : isPremium ? 'ᴘʀᴇᴍɪᴜᴍ' : 'ғʀᴇᴇ'}
  
❖ [ *\`MAIN MENU\`* ]
│ ◆ ${prefix}daftar
│ ◆ ${prefix}ping
│ ◆ ${prefix}runtime
│ ◆ ${prefix}motivasi
│ ◆ ${prefix}totalfitur
│ ◆ ${prefix}totalplugin
│ ◆ ${prefix}saveweb
│ ◆ ${prefix}sewa
│ ◆ ${prefix}sc
│ ◆ ${prefix}cekcuaca <kota>
│ ◆ ${prefix}tts
│ ◆ ${prefix}tts2
│ ◆ ${prefix}pin
│ ◆ ${prefix}repo
╰─────────╾`
return SendButton(teks)
}

handler.command = ["mainmenu"]
module.exports = handler