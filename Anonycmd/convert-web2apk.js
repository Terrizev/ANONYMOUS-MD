let axios = require('axios')

let handler = async (m, { text, command }) => {
    if (!text) return m.reply(`Send the Website URL, Email, and Application Name!\n\nExample:\n${command} https://example.com email@gmail.com AppName`)
    
    let [url, email, ...nameArr] = text.split(" ")
    let name = nameArr.join(" ")
    
    if (!url || !url.startsWith("http")) return m.reply("Invalid Website URL!")
    if (!email || !email.includes("@")) return m.reply("Invalid Email!")
    if (!name) return m.reply("Application Name Cannot Be Empty!")
    
    m.reply("⏳ Processing APK Build, Wait About 5 Minutes...")
    
    try {
        let apiurl = `https://web2apk-cg.zone.id/tools/web2app?apikey=bagus&url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
        let res = await axios.get(apiurl)
        
        if (!res.data.status) return m.reply("❌ Failed to Create Application, Try Again Later.")
        
        m.reply(`✅ *APK Build Successful!*\n\n📛 Name: ${res.data.appName}\n📥 Download: ${res.data.download}`)
    } catch (e) {
        m.reply("❌ An Error Occurred: " + e.message)
    }
}

handler.command = ['web2app', 'buatapk']
handler.tags = ['tools']
handler.help = ['web2app <url> <email> <name>']

module.exports = handler