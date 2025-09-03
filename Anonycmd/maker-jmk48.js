const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('🚩 Please reply to an image to add a JMK48 frame.');

  let mediaBuffer = null;

  try {
    if (conn.downloadAndSaveMediaMessage) {
      try {
        const tmp = await conn.downloadAndSaveMediaMessage(m.quoted);
        mediaBuffer = fs.readFileSync(tmp);
        try { fs.unlinkSync(tmp); } catch {}
      } catch {}
    }

    if (!mediaBuffer && conn.downloadMediaMessage) {
      try {
        mediaBuffer = await conn.downloadMediaMessage(m.quoted);
      } catch {}
    }

    if (!mediaBuffer && conn.downloadContentFromMessage) {
      try {
        const quotedMsg = m.quoted.message || m.quoted.msg || m.quoted;
        const type = Object.keys(quotedMsg)[0];
        const stream = await conn.downloadContentFromMessage(quotedMsg[type], type.replace('Message', ''));
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        mediaBuffer = buffer;
      } catch {}
    }
  } catch (err) {
    mediaBuffer = null;
  }

  if (!mediaBuffer) return m.reply('🚩 Failed to get the image. Make sure you reply to a valid image message.');

  await m.reply('⏳ Creating JMK48 Frame...');

  try {
    const frameURL = 'https://files.catbox.moe/3rur70.png';

    const [frameImg, userImg] = await Promise.all([
      loadImage(frameURL),
      loadImage(mediaBuffer)
    ]);

    const canvas = createCanvas(frameImg.width, frameImg.height);
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = Math.round(canvas.height * 0.500);
    const radius = Math.round(canvas.width * 0.400);

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(userImg, centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.restore();

    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

    const buffer = canvas.toBuffer('image/png');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: '✨ JMK48 Frame created successfully!'
    }, { quoted: m });

  } catch (err) {
    console.error('[JMK48 ERROR]', err);
    m.reply('❌ Failed to create JMK48 frame');
  }
};

handler.help = ['jmk48'];
handler.tags = ['maker'];
handler.command = ['jmk48']

module.exports = handler;