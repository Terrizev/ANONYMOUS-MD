const fs = require("fs")

let handler = async (m, { conn, isCreator, reply, text, }) => {
if (!isCreator) return reply(global.mess.creator)
if (!text) return reply("plugin filename")
if (!text.endsWith(".js")) return reply("File name must be in .js format")
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return reply("Plugin file not found!")
let res = await fs.readFileSync("./plugins/" + text.toLowerCase())
return reply(`${res.toString()}`)
}

handler.command = ["getp", "gp", "getplugins", "getplugin"]

module.exports = handler