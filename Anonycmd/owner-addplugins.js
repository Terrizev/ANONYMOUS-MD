const fs = require("fs")

let handler = async (m, { conn, isCreator, text, reply }) => {
if (!isCreator) return reply(global.mess.creator)
if (!text) return reply("filename & reply code")
if (!m.quoted || !m.quoted.text) return reply("filename & reply code")
if (!text.endsWith(".js")) return reply("File name must be in .js format")
let condition = "add"
if (fs.existsSync("./plugins/" + text)) return reply("Plugin file name is already registered in the plugins folder!")
let textContent = m.quoted.text
await fs.writeFileSync("./plugins/" + text, textContent)
return reply(`Successfully ${condition} plugin file *${text}*`)
}

handler.command = ["addplugins", "addplugin", "addp", "addplug"]

module.exports = handler