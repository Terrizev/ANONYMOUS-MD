const fs = require("fs")

let handler = async (m, { conn, isCreator, text, reply, }) => {
if (!isCreator) return reply(global.mess.creator)
if (!text) return reply("plugin filename")
if (!text.endsWith(".js")) return reply("File name must be in .js format")
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return reply("Plugin file not found!")
await fs.unlinkSync("./plugins/" + text.toLowerCase())
return reply(`Successfully deleted plugin file *${text.toLowerCase()}*`)
}

handler.command = ["delplugins", "delplugin"]

module.exports = handler