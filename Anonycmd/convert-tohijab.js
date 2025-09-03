
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

let handler = async (m, { conn, command, prefix, reply }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) return m.reply(`Send/reply to an image with caption *${prefix + command}*`);
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Format ${mime} is not supported! Only jpeg/jpg/png`);

    try {

        let imgData = await q.download();

        const form = new FormData();
        form.append('image', imgData, { filename: 'upload.jpg', contentType: mime });

        const response = await axios.post('https://xyro.site/fun/hijabkan', form, {
            headers: form.getHeaders(),
            responseType: 'arraybuffer'
        });

        const tempPath = path.join(process.cwd(), './src/tmp', `result_${Date.now()}.jpg`);
        fs.writeFileSync(tempPath, response.data);

        await conn.sendMessage(m.chat, { 
            image: fs.readFileSync(tempPath),
            caption: '✅ Processing result'
        }, { quoted: m });

        setTimeout(() => {
            try { fs.unlinkSync(tempPath); } 
            catch (e) { console.error('Failed to delete temporary file:', e); }
        }, 30000);

    } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'Failed to process image';
        if (error.response) {
            try { errorMessage = error.response.data?.message || error.response.statusText || 'Error from API'; } 
            catch (e) { errorMessage = 'Invalid error format'; }
        } else if (error.message) errorMessage = error.message;
        m.reply(`Error: ${errorMessage}`);
    }
};

handler.command = ['tohijab']
handler.tags = ['convert']

module.exports = handler;