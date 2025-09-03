const { createCanvas, loadImage, registerFont } = require('canvas')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

let handler = async (m, { conn, text }) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || ''
  if (!mime.startsWith('image/')) return m.reply('Where is the Image?')
  m.reply('Wait...')
  
  const tmpDir = process.cwd()
  const fontUrl = 'https://cloudkuimages.com/uploads/files/CL8QHRYN.ttf'
  const fontPath = path.join(tmpDir, 'CL8QHRYN.ttf')

  try {
    if (!fs.existsSync(fontPath)) {
      const res = await axios.get(fontUrl, { responseType: 'arraybuffer' })
      fs.writeFileSync(fontPath, Buffer.from(res.data))
    }

    registerFont(fontPath, { family: 'CustomFont' })

    const mediaBuffer = await q.download()
    const userImage = await loadImage(mediaBuffer)
    const bg = await loadImage('https://files.catbox.moe/liplnf.jpg')
    const frameOverlay = await loadImage('https://files.catbox.moe/2vm2lt.png')

    const canvas = createCanvas(bg.width, bg.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatarSize = 205
    const frameSize = 293
    const centerX = (canvas.width - frameSize) / 2
    const centerY = (canvas.height - frameSize) / 2 - 282
    const avatarX = centerX + (frameSize - avatarSize) / 2
    const avatarY = centerY + (frameSize - avatarSize) / 2 - 3

    const { width, height } = userImage
    const minSide = Math.min(width, height)
    const cropX = (width - minSide) / 2
    const cropY = (height - minSide) / 2

    ctx.drawImage(userImage, cropX, cropY, minSide, minSide, avatarX, avatarY, avatarSize, avatarSize)
    ctx.drawImage(frameOverlay, centerX, centerY, frameSize, frameSize)

    const nickname = (text || '').trim() || 'Player'
    const maxFontSize = 36
    const minFontSize = 24
    const maxChar = 11
    let fontSize = maxFontSize
    if (nickname.length > maxChar) {
      const excess = nickname.length - maxChar
      fontSize -= excess * 2
      if (fontSize < minFontSize) fontSize = minFontSize
    }

    ctx.font = `${fontSize}px CustomFont`
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(nickname, canvas.width / 2 + 13, centerY + frameSize + 15)

    const buffer = canvas.toBuffer('image/png')
    await conn.sendMessage(m.chat, { image: buffer, caption: 'Done' }, { quoted: m })

  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ['fakeml <nickname>']
handler.tags = ['maker']
handler.command = ['fakeml']

module.exports = handler