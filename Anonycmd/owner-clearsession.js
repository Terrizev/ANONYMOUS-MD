const fs = require("fs")

let handler = async (m, { isCreator, reply }) => {
if (!isCreator) return reply(global.mess.creator)
const sessionDir = fs.readdirSync("./session").filter(e => e !== "creds.json")
for (const file of sessionDir) {
await fs.unlinkSync("./session/" + file)
}
reply(`*Successfully cleaned junk ✅*
*${sessionDir.length}* session junk files`)
}

handler.command = ["boost", "clearsession", "clsesi", "clearsesi"]

module.exports = handler