
const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')

const handler = async (m, { conn }) => {
    try {
        const quoted = m.quoted || m
        const mime = (quoted.msg || quoted).mimetype || ''
        if (!mime) return m.reply('❌ Send or Reply to a File With Caption *.sfup*')

        m.reply('⬆️ Uploading to Sfile...')

        const mediaPath = await conn.downloadAndSaveMediaMessage(quoted)
        const form = new FormData()
        form.append('file', fs.createReadStream(mediaPath))

        const res = await axios.post('https://sfile-api.zone.id/tools/sfup?apikey=bagus', form, {
            headers: form.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        })

        fs.unlinkSync(mediaPath)

        const data = res.data
        if (!data.success || !Array.isArray(data.urls)) {
            return m.reply('❌ Failed to Upload File to Sfile.')
        }

        const link = data.urls[0] || '-'
        const caption = `✅ *Sfile Upload Successful!*\n\n📁 *File Name:* ${data.filename}\n🕒 *Uploaded:* ${data.uploaded_at}\n🔗 *Link:* ${link}`

        await conn.sendMessage(m.chat, { text: caption }, { quoted: m })

    } catch (err) {
        console.error('Sfile Upload Error:', err)
        m.reply(`❌ Failed to Upload to Sfile:\n${err.response?.data?.message || err.message}`)
    }
}

handler.command = ['sfileup']
handler.tags = ['tools']
handler.help = ['sfup (reply file)']

module.exports = handler