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
  
❖ [ *\`NFSW MENU\`* ]
│ ◆ ${prefix}ass
│ ◆ ${prefix}ahegeo
│ ◆ ${prefix}bdsm
│ ◆ ${prefix}blowjob
│ ◆ ${prefix}hentai
│ ◆ ${prefix}thighs
│ ◆ ${prefix}tentacles
│ ◆ ${prefix}pussy
│ ◆ ${prefix}panties
│ ◆ ${prefix}orgy
│ ◆ ${prefix}nsfwloli
│ ◆ ${prefix}neko-hentai2
│ ◆ ${prefix}neko-hentai
│ ◆ ${prefix}masturbation
│ ◆ ${prefix}jahy
│ ◆ ${prefix}glasses
│ ◆ ${prefix}gangbang
│ ◆ ${prefix}food
│ ◆ ${prefix}femdom
│ ◆ ${prefix}ero
│ ◆ ${prefix}eba
│ ◆ ${prefix}cum
│ ◆ ${prefix}cuckold
│ ◆ ${prefix}vidhentai [video]
│ ◆ ${prefix}paptt [foto]
╰─────────╾`
return SendButton(teks)
}

handler.command = ["nfswmenu"]
module.exports = handler