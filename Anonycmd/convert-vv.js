let handler = async (m, { conn, command, prefix }) => {
    if (!m.quoted) return m.reply(
        `*❌ Syntax Error!!*\n*Example:* reply to a ViewOnce message with caption ${prefix + command}`
    );

    try {
        let buffer = await m.quoted.download();
        let type = m.quoted.mtype;
        let sendOptions = { quoted: m };
        let caption = "😏";

        if (type === "videoMessage") {
            await conn.sendMessage(m.chat, { video: buffer, caption }, sendOptions);
        } else if (type === "imageMessage") {
            await conn.sendMessage(m.chat, { image: buffer, caption }, sendOptions);
        } else if (type === "audioMessage") {
            await conn.sendMessage(m.chat, {
                audio: buffer,
                mimetype: "audio/mpeg",
                ptt: m.quoted.ptt || false
            }, sendOptions);
        } else {
            return m.reply("❌ View Once Media Not Supported.");
        }
    } catch (err) {
        console.error(err);
        m.reply("❌ Failed to process View Once.");
    }
};

handler.help = ["rvo"];
handler.tags = ["tools"];
handler.command = ["vv"];

module.exports = handler;