const handler = async (m, { conn, isCreator, isGroup }) => {
    if (!isCreator) return m.reply(mess.creator)
    if (!isGroup) return m.reply(mess.group)
    await m.reply("Okay, I will leave this group")
    await new Promise(r => setTimeout(r, 4000))
    await conn.groupLeave(m.chat)
}

handler.command = ['leave']
handler.tags = ['owner']
handler.help = ['leave']

module.exports = handler