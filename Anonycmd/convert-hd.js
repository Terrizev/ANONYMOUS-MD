const axios = require('axios')
const FormData = require('form-data')

async function Uguu(buffer, filename) {
  const form = new FormData()
  form.append('files[]', buffer, { filename })
  const { data } = await axios.post('https://uguu.se/upload.php', form, { headers: form.getHeaders() })
  if (data.files && data.files[0]) return data.files[0].url
  else throw new Error('Upload Failed')
}

let handler = async (m, { conn, quoted }) => {
  if (!m.quoted || !/image/.test(m.quoted.mimetype)) return m.reply('Reply to a Photo!')
  
  let buffer = await m.quoted.download()
  let fileUrl = await Uguu(buffer, `image_${Date.now()}.jpg`)
  
  let apiUrl = `https://api.vreden.my.id/api/artificial/hdr?url=${encodeURIComponent(fileUrl)}&pixel=4`
  let { data } = await axios.get(apiUrl)
  
  if (data.status === 200 && data.result?.data?.downloadUrls?.[0]) {
    let resultUrl = data.result.data.downloadUrls[0]
    let resBuffer = (await axios.get(resultUrl, { responseType: 'arraybuffer' })).data
    await conn.sendMessage(m.chat, { image: resBuffer, caption: 'HDR Pixel 4 Editing Complete ✅' }, { quoted: m })
  } else {
    m.reply('Failed to Process Image!')
  }
}

handler.command = ['hd', 'hdr', 'remini']
handler.tags = ['convert']
handler.help = ['hd', 'hdr', 'upscale']
module.exports = handler