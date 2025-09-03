const axios = require('axios');

const handler = async (m, { conn, text, prefix, command }) => {
  
  if (!text) return m.reply(`Send the command with the format: ${prefix + command} <text>`);

  try {
    // API Brat animation (video sticker)
    let brat = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=true&delay=500`;

    let response = await axios.get(brat, { responseType: "arraybuffer" });
    let videoBuffer = response.data;

    await conn.sendVideoAsSticker(m.chat, videoBuffer, m, {
      packname: "Brat Video Generator",
      author: `Ouka`, 
    });

    console.log("Video sticker successfully created:", text);

  } catch (err) {
    console.error("Error:", err);
    m.reply("[❗] Sorry, an error occurred while trying to create the video sticker. Please try again.");
  }
};

handler.help = ['bratvid <text>'];
handler.tags = ['maker'];
handler.command = ['bratvid', 'bratvideo'];

module.exports = handler;