const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');
const { getAntilink, incrementWarningCount, resetWarningCount, isSudo } = require('../lib/index');

const WARN_COUNT = config.WARN_COUNT || 5;

// Define allowed URLs (case-insensitive)
const ALLOWED_URLS = [
  'whatsapp.com/channel/0029vb57zhh7iuycnttxeb3y', // Lowercase version of original URL
  'github.com/terrizev/anonymous-md',
  'github.com/terrizev/anonymous-md/fork'
].map(url => url.toLowerCase());

function containsURL(str) {
  const urlRegex = /(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?/i;
  return urlRegex.test(str);
}

async function Antilink(msg, sock) {
  const jid = msg.key.remoteJid;
  if (!isJidGroup(jid)) return;

  const SenderMessage = msg.message?.conversation || 
                       msg.message?.extendedTextMessage?.text || '';
  if (!SenderMessage || typeof SenderMessage !== 'string') return;

  const sender = msg.key.participant;
  if (!sender) return;

  // Check if sender is group admin or sudo
  const metadata = await sock.groupMetadata(jid);
  const participant = metadata.participants.find(p => p.id === sender);
  const isGroupAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin';
  const isSudoUser = await isSudo(sender);

  if (isGroupAdmin || isSudoUser) return;

  // Check if message contains URLs
  if (!containsURL(SenderMessage.trim())) return;

  // Check for allowed URLs (case-insensitive)
  const messageLower = SenderMessage.toLowerCase();
  const hasAllowedURL = ALLOWED_URLS.some(url => messageLower.includes(url));
  if (hasAllowedURL) return;

  const antilinkConfig = await getAntilink(jid, 'on');
  if (!antilinkConfig) return;

  const action = antilinkConfig.action;
  
  try {
    await sock.sendMessage(jid, { delete: msg.key });

    switch (action) {
      case 'delete':
        await sock.sendMessage(jid, { 
          text: `\`\`\`@${sender.split('@')[0]} links are not allowed here\`\`\``,
          mentions: [sender] 
        });
        break;

      case 'kick':
        await sock.groupParticipantsUpdate(jid, [sender], 'remove');
        await sock.sendMessage(jid, {
          text: `\`\`\`@${sender.split('@')[0]} has been kicked for sending links\`\`\``,
          mentions: [sender]
        });
        break;

      case 'warn':
        const warningCount = await incrementWarningCount(jid, sender);
        if (warningCount >= WARN_COUNT) {
          await sock.groupParticipantsUpdate(jid, [sender], 'remove');
          await resetWarningCount(jid, sender);
          await sock.sendMessage(jid, {
            text: `\`\`\`@${sender.split('@')[0]} has been kicked after ${WARN_COUNT} warnings\`\`\``,
            mentions: [sender]
          });
        } else {
          await sock.sendMessage(jid, {
            text: `\`\`\`@${sender.split('@')[0]} warning ${warningCount}/${WARN_COUNT} for sending links\`\`\``,
            mentions: [sender]
          });
        }
        break;
    }
  } catch (error) {
    console.error('Error in Antilink:', error);
  }
}

module.exports = { Antilink };
