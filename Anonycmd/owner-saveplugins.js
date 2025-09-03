const fs = require("fs")

let handler = async (m, { conn, isCreator, text }) => {
if (!isCreator) return reply(global.mess.creator)
if (!text) return reply("filename & reply code")
if (!m.quoted || !m.quoted.text) return reply("filename & reply code")
if (!text.endsWith(".js")) return reply("File name must be in .js format")
let condition = "edit"
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return reply("Plugin file not found!")
let textContent = m.quoted.text
await fs.writeFileSync("./plugins/" + text, textContent)
return reply(`Successfully ${condition} plugin file *${text}*`)
}

handler.command = ["sp", "svp", "saveplugins", "saveplugin"]

module.exports = handler