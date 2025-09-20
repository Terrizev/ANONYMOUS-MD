
module.exports = async (m, { conn, args, prefix, isCreator, isAdmins, isGroup, reply }) => {
  try {
    if (!isGroup) return reply('This command can only be used in groups.');
    if (!isAdmins && !isCreator) return reply('Only group admins or bot owner can toggle anti-link.');

    // ensure db structure
    global.db.data = global.db.data || {};
    global.db.data.chats = global.db.data.chats || {};
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {};

    const action = (args[0] || '').toLowerCase();

    if (action === 'on' || action === 'enable') {
      global.db.data.chats[m.chat].antilink = true;
      if (global.db.write) await global.db.write();
      return reply('✅ Anti-link has been enabled for this group.');
    } else if (action === 'off' || action === 'disable') {
      global.db.data.chats[m.chat].antilink = false;
      if (global.db.write) await global.db.write();
      return reply('✅ Anti-link has been disabled for this group.');
    } else {
      const status = global.db.data.chats[m.chat].antilink ? 'ON' : 'OFF';
      return reply(`Anti-link status for this group: ${status}\nUsage: ${prefix}antilink on | ${prefix}antilink off`);
    }
  } catch (e) {
    console.error('antilink plugin error:', e);
    return reply('An error occurred while toggling anti-link.');
  }
};

module.exports.command = ['antilink'];