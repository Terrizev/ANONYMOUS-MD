const { generateWAMessageFromContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, proto, delay } = require('@whiskeysockets/baileys')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const chalk = require('chalk')
require('../config')

module.exports.welcome = async (iswel, isleft, trashcore, anu) => {
  try {
    const metadata = await trashcore.groupMetadata(anu.id)
    const participants = anu.participants
    const num = participants[0]
    const groupName = metadata.subject
    const groupDesc = metadata.desc
    const memberCount = metadata.participants.length
    const isWelcomeEnabled = global.db.data.chats[anu.id]?.welcome
    const isLeftEnabled = global.db.data.chats[anu.id]?.goodbye
    const mentionedJid = [`${num}@s.whatsapp.net`]
    let avatarUrl, ppgroup

    try {
      avatarUrl = await trashcore.profilePictureUrl(num, 'image')
    } catch {
      avatarUrl = 'https:'                                            
    }

    
    try {
      ppgroup = await trashcore.profilePictureUrl(anu.id, 'image')
    } catch {
      ppgroup = 'https://files.catbox.moe/sufl90.jpg'
    }

    if (anu.action == 'add' && (iswel || isWelcomeEnabled)) {
      let fullMessage
      if (global.db.data.chats[anu.id]?.text_welcome) {
        let text = global.db.data.chats[anu.id].text_welcome
        fullMessage = text
          .replace(/@user/gi, `@${num.split('@')[0]}`)
          .replace(/@group/gi, groupName)
          .replace(/@desc/gi, groupDesc || '')
      } else {
        fullMessage = `Welcome @${num.split('@')[0]}\nTo Group: ${groupName}`
      }
      await trashcore.sendMessage(anu.id, {
        text: fullMessage,
        contextInfo: {
          mentionedJid,
          externalAdReply: {
            title: `☘️ yo! Welcome!`,
            body: `${global.botname}`,
            thumbnailUrl: ppgroup,
            sourceUrl: "https://github.com",                                          
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      })
    }

    if (anu.action == 'remove' && (isleft || isLeftEnabled)) {
      let fullMessage
      if (global.db.data.chats[anu.id]?.text_left) {
        let text = global.db.data.chats[anu.id].text_left
        fullMessage = text
          .replace(/@user/gi, `@${num.split('@')[0]}`)
          .replace(/@group/gi, groupName)
          .replace(/@desc/gi, groupDesc || '')
      } else {
        fullMessage = `Goodbye @${num.split('@')[0]}\nFrom Group: ${groupName}`
      }
      await trashcore.sendMessage(anu.id, {
        text: fullMessage,
        contextInfo: {
          mentionedJid,
          externalAdReply: {
            title: `Goodbye! pussy See you later!`,
            body: `${global.botname}`,
            thumbnailUrl: ppgroup,
            sourceUrl: "https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      })
    }

    if (anu.action == 'remove' && (isleft || isLeftEnabled)) {
      let fullMessage
      if (global.db.data.chats[anu.id]?.text_left) {
        let text = global.db.data.chats[anu.id].text_left
        fullMessage = text
          .replace(/@user/gi, `@${num.split('@')[0]}`)
          .replace(/@group/gi, groupName)
          .replace(/@desc/gi, groupDesc || '')
      } else {
        fullMessage = `Goodbye @${num.split('@')[0]}\nFrom Group: ${groupName}`
      }
      await trashcore.sendMessage(anu.id, {
        text: fullMessage,
        contextInfo: {
          mentionedJid,
          externalAdReply: {
            title: ` Goodbye!😒`,
            body: `${global.botname}`,
            thumbnailUrl: ppgroup,
            sourceUrl: "https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      })
    }
  } catch (err) {
    console.error('Error welcome handler:', err)
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.greenBright(`Update File => ${__filename}`))
  delete require.cache[file]
  require(file)
})