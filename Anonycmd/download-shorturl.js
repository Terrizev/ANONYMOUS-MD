const axios = require('axios');

let handler = async (m, { text, command, prefix }) => {
  if (!text) return m.reply(`Add the link you want to shorten!\nExample:\n${prefix + command} https://example.com`);

  try {
    const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
    if (!res.data || !res.data.startsWith('http')) throw 'Failed to shorten URL.';
    
    m.reply(`✅ *Shortened Successfully!*\n\n🔗 *TinyURL:* ${res.data}`);
  } catch (err) {
    console.error('Error shortening URL:', err);
    m.reply('❌ Failed to shorten URL. Try again later.');
  }
};

handler.help = ['shorturl <link>', 'shorten <link>', 'shortlink <link>', 'shortenlink <link>'];
handler.tags = ['tools'];
handler.command = ['shorturl', 'shorten', 'shortlink', 'shortenlink'];

module.exports = handler;