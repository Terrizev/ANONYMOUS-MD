const fs = require("fs");
const path = require("path");

let handler = async (m, { reply }) => {
  try {
    const pluginDir = path.join(__dirname, "../plugins");
    const files = fs.readdirSync(pluginDir).filter(file => file.endsWith(".js"));

    if (files.length === 0) {
      return reply("📑 No plugin files in the folder.");
    }

    reply(`📑 Total plugin features currently: *${files.length}*`);
  } catch (err) {
    console.error(err);
    reply("❌ Failed to read plugin folder.");
  }
};

handler.command = ["totalplugin", "totalplug"];
module.exports = handler;