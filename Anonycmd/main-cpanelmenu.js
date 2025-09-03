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
        newsletterName: 'cpanelmenu'
}
  }
}, { quoted: m })
}

const teks = ` 
       \`[ Anonymous bot ]\`
[✦]  botmode: ${conn.public ? "Public" : "Self"}
[✦]  version: V5.0.0
[✦]  status user: ${isCreator ? 'owner' : isPremium ? 'ᴘʀᴇᴍɪᴜᴍ' : 'ғʀᴇᴇ'}

❖ [ *\`CPANEL MENU\`* ]
│ ◆ ${prefix}1gb
│ ◆ ${prefix}2gb
│ ◆ ${prefix}3gb
│ ◆ ${prefix}4gb
│ ◆ ${prefix}5gb
│ ◆ ${prefix}6gb
│ ◆ ${prefix}7gb
│ ◆ ${prefix}8gb
│ ◆ ${prefix}9gb
│ ◆ ${prefix}10gb
│ ◆ ${prefix}unli
│ ◆ ${prefix}listserver
│ ◆ ${prefix}delsrv
│ ◆ ${prefix}listadmin
│ ◆ ${prefix}deladmin
│ ◆ ${prefix}cadmin
│ ◆ ${prefix}deluser
╰─────────╾`
return SendButton(teks)
}

handler.command = ["cpanelmenu"]
module.exports = handler