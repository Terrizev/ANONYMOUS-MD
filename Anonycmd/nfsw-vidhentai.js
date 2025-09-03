const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { text, args, usedPrefix, command, conn }) => {
 m.reply(`Hello, the command ${command} has been given by botz to chat in private. Enjoy!`);

 try {
 let cr = await xhentai();
 if (!cr.length) {
 return m.reply('No results found.');
 }
 
 let tan = cr[Math.floor(Math.random() * cr.length)];
 let vap = `
⭔ Title : ${tan.title}
⭔ Category : ${tan.category}
⭔ Mimetype : ${tan.type}
⭔ Views : ${tan.views_count}
⭔ Shares : ${tan.share_count}
⭔ Source : ${tan.link}
⭔ Media Url : ${tan.video_1}
 `;

 await conn.sendMessage(m.sender, { video: { url: tan.video_1 }, caption: vap }, { quoted: m });
 } catch (e) {
 console.error(e);
 m.reply('An error occurred while fetching the video.');
 }
};

handler.help = ['vidhentai'];
handler.command = ['vidhentai']
handler.tags = ['nfsw'];

module.exports = handler;

async function xhentai() {
 let page = Math.floor(Math.random() * 1153);
 try {
 let { data } = await axios.get(`https://sfmcompile.club/page/${page}`);
 let $ = cheerio.load(data);
 let hasil = [];

 $('#primary > div > div > ul > li > article').each((_, b) => {
 hasil.push({
 title: $(b).find('header > h2').text().trim(),
 link: $(b).find('header > h2 > a').attr('href'),
 category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', '').trim(),
 share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text().trim(),
 views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text().trim(),
 type: $(b).find('source').attr('type') || 'image/jpeg',
 video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src') || '',
 video_2: $(b).find('video > a').attr('href') || ''
 });
 });

 return hasil;
 } catch (error) {
 console.error('Error fetching hentai videos:', error);
 return [];
 }
}