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
  
❖ [ *\`OWNER MENU\`* ]
│ ◆ ${prefix}clearsesi
│ ◆ ${prefix}public
│ ◆ ${prefix}self
│ ◆ ${prefix}get
│ ◆ ${prefix}reactch
│ ◆ ${prefix}backupouka
│ ◆ ${prefix}esm2cjs
│ ◆ ${prefix}setppbot
│ ◆ ${prefix}delppbot
│ ◆ ${prefix}addprem
│ ◆ ${prefix}delprem
│ ◆ ${prefix}listpc
│ ◆ ${prefix}setbiobot
│ ◆ ${prefix}delbiobot
│ ◆ ${prefix}leave
│ ◆ ${prefix}addprem
│ ◆ ${prefix}delprem
│ ◆ ${prefix}autoread 
│ ◆ ${prefix}autorecording 
│ ◆ ${prefix}save
│ ◆ ${prefix}autotyping 
╰─────────`
return SendButton(teks)
}

handler.command = ["ownermenu"]
module.exports = handler