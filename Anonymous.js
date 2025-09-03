//乂/////////[ SETTINGS MODULE ]/////////乂//
require("./settings");
const {
  default: makeWaSocket,
  socket,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  downloadContentFromMessage,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@whiskeysockets/baileys");
const { modul } = require("./lib/module");
const { exec } = require("child_process");
const { axios, baileys, chalk, cheerio, FileType, fs, ffmpeg, PhoneNumber, process, moment, ms, util, ytdl,  } = modul;
const os = require('os');
const speed = require('performance-now')
const yts = require('yt-search');
const sharp = require('sharp');
const didyoumean = require('didyoumean');
const similarity = require('similarity')
const { color, bgcolor } = require("./lib/color");
const { delay } = require("@whiskeysockets/baileys");
const readFile = util.promisify(fs.readFile);
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const path = require("path");

module.exports = conn = async (conn, m, chatUpdate, store) => {
try {
  async function appenTextMessage(text, chatUpdate) {
    let messages = await generateWAMessage(
      m.chat,
      {
        text: text,
        mentions: m.mentionedJid,
      },
      {
        userJid: conn.user.id,
        quoted: m.quoted && m.quoted.fakeObj,
      },
    );
    messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    if (m.isGroup) messages.participant = m.sender;
    let msg = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)],
      type: "append",
    };
    conn.ev.emit("messages.upsert", msg);
  }
  const { type, quotedMsg, mentioned, now, fromMe } = m;
  let body =
    m.mtype === "interactiveResponseMessage"
      ? JSON.parse(
          m.message.interactiveResponseMessage.nativeFlowResponseMessage
            .paramsJson,
        ).id
      : m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
          ? m.message.imageMessage.caption
          : m.mtype == "videoMessage"
            ? m.message.videoMessage.caption
            : m.mtype == "extendedTextMessage"
              ? m.message.extendedTextMessage.text
              : m.mtype == "buttonsResponseMessage"
                ? m.message.buttonsResponseMessage.selectedButtonId
                : m.mtype == "listResponseMessage"
                  ? m.message.listResponseMessage.singleSelectReply
                      .selectedRowId
                  : m.mtype == "templateButtonReplyMessage"
                    ? m.message.templateButtonReplyMessage.selectedId
                    : m.mtype == "messageContextInfo"
                      ? m.message.buttonsResponseMessage?.selectedButtonId ||
                        m.message.listResponseMessage?.singleSelectReply
                          .selectedRowId ||
                        m.text
                      : m.mtype === "editedMessage"
                        ? m.message.editedMessage.message.protocolMessage
                            .editedMessage.extendedTextMessage
                          ? m.message.editedMessage.message.protocolMessage
                              .editedMessage.extendedTextMessage.text
                          : m.message.editedMessage.message.protocolMessage
                              .editedMessage.conversation
                        : "";
        
//乂/////////[ SETTINGS FILE ]/////////乂//
const {
  clockString,
  parseMention,
  formatp,
  isUrl,
  sleep,
  runtime,
  getBuffer,
  jsonformat,
  format,
  capital,
  reSize,
  formatSize, 
  getRandom, 
  fetchJson,
  generateProfilePicture,
} = require("./lib/myfunc");

 const {
  CatBox,
  UploadFileUgu,
  fileIO,
  pomfCDN,
  webp2mp4File,
  webp2mp4,
} = require("./lib/uploader");  
    
 const {
getRegisteredRandomId, 
addRegisteredUser, 
createSerial, 
checkRegisteredUser 
} = require('./lib/register.js')

    
//DATABASE   
const Premium = JSON.parse(fs.readFileSync("./database/premium.json"))

//~~~~~~~~~~~ Db Blacklist Gc ~~~~~~~~~~//
        const filePath = './database/blacklist.json'
        let blacklist = [];
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            blacklist = JSON.parse(data); 
        } catch (err) {
            console.error('Failed to read blacklist.json file:', err.message);
            blacklist = []; 
        }

//~~~~~~~~~~~~~~~~SETtING BOT PREFIX OWNER~~~~~~~~~~~~~~~~~~~~~\\                            
		const budy = m.text
		const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '.'
		const isCmd = body.startsWith(prefix)
		const isCommand = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ""
		const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
  const args = body.trim().split(/ +/).slice(1);
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = m.sender === global.ownernumber.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const pushname = m.pushName || "Nothing";
    const sender = m.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (m.key.participant || m.key.remoteJid)
  const text = (q = args.join(" "));
  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || "";
  const qmsg = quoted.msg || quoted;
  const isMedia = /image|video|sticker|audio/.test(mime);
  const isImage = type == "imageMessage";
  const isVideo = type == "videoMessage";
  const isAudio = type == "audioMessage";
  const isSticker = type == "stickerMessage";
  const isQuotedImage =
    type === "extendedTextMessage" && content.includes("imageMessage");
  const isQuotedLocation =
    type === "extendedTextMessage" && content.includes("locationMessage");
  const isQuotedVideo =
    type === "extendedTextMessage" && content.includes("videoMessage");
  const isQuotedSticker =
    type === "extendedTextMessage" && content.includes("stickerMessage");
  const isQuotedAudio =
    type === "extendedTextMessage" && content.includes("audioMessage");
  const isQuotedContact =
    type === "extendedTextMessage" && content.includes("contactMessage");
  const isQuotedDocument =
    type === "extendedTextMessage" && content.includes("documentMessage");
  const senderNumber = sender.split("@")[0];
  const groupMetadata = m?.isGroup ? await conn.groupMetadata(m.chat).catch(() => ({})) : {};
  const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                admin,
                full: p
            };
        }) || []: [];
  const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
  const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);  
  const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
  const groupMembership =
    m.isGroup && groupMetadata ? groupMetadata.membership : [];
  const groupMembers =
    m.isGroup && groupMetadata ? groupMetadata.participants : [];
  const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber) : false;
  const from = m.key.remoteJid;
   const isGroup = from.endsWith("@g.us");
  const isGroupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);
  const isAdmins = m?.isGroup ? groupAdmins.includes(m.sender) : false;
  const isGroupOwner = m?.isGroup ? groupOwner === m.sender : false;
        async function getLid(jid) {
            return conn.getLidUser(jid)
        }
  const isPremium = Premium.includes(m.sender)
  const isRegistered = checkRegisteredUser(m.sender)
  const mentionUser = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];
  const mentionByTag =
    type == "extendedTextMessage" &&
    m.message.extendedTextMessage.contextInfo != null
      ? m.message.extendedTextMessage.contextInfo.mentionedJid
      : [];
  const mentionByReply =
    type == "extendedTextMessage" &&
    m.message.extendedTextMessage.contextInfo != null
      ? m.message.extendedTextMessage.contextInfo.participant || ""
      : "";
  const numberQuery =
    q.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net";
  const usernya = mentionByReply ? mentionByReply : mentionByTag[0];
  const Input = mentionByTag[0]
    ? mentionByTag[0]
    : mentionByReply
      ? mentionByReply
      : q
        ? numberQuery
        : false;


// read database
let tebaklagu = [];
let _family100 = [];
let kuismath = [];
let tebakgambar = [];
let tebakkata = [];
let transactionDetails = {};
let caklontong = [];
let caklontong_desk = [];
let tebakkalimat = [];
let tebaklirik = [];
let tebaktebakan = [];
let tebakbendera = [];

 try {
ppuser = await conn.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)
try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let limitUser = isPremium ? 1000 : 30
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.money)) user.money = 0
if (!isNumber(user.chip)) user.chip = 0
if (!isNumber(user.atm)) user.atm = 0
if (!isNumber(user.fullatm)) user.fullatm = 0
if (!isNumber(user.bank)) user.bank = 0
if (!isNumber(user.health)) user.health = 100
if (!isNumber(user.potion)) user.potion = 0
if (!isNumber(user.trash)) user.trash = 0
if (!isNumber(user.wood)) user.wood = 0
if (!isNumber(user.rock)) user.rock = 0
if (!isNumber(user.string)) user.string = 0
if (!isNumber(user.petfood)) user.petfood = 0
if (!isNumber(user.emerald)) user.emerald = 0
if (!isNumber(user.diamond)) user.diamond = 0
if (!isNumber(user.gold)) user.gold = 0
if (!isNumber(user.botol)) user.botol = 0
if (!isNumber(user.kardus)) user.kardus = 0
if (!isNumber(user.kaleng)) user.kaleng = 0
if (!isNumber(user.gelas)) user.gelas = 0
if (!isNumber(user.plastik)) user.plastik = 0
if (!isNumber(user.iron)) user.iron = 0
if (!isNumber(user.common)) user.common = 0
if (!isNumber(user.uncommon)) user.uncommon = 0
if (!isNumber(user.mythic)) user.mythic = 0
if (!isNumber(user.legendary)) user.legendary = 0
if (!isNumber(user.umpan)) user.umpan = 0
if (!isNumber(user.pet)) user.pet = 0
if (!isNumber(user.paus)) user.paus = 0
if (!isNumber(user.kepiting)) user.kepiting = 0
if (!isNumber(user.gurita)) user.gurita = 0
if (!isNumber(user.cumi)) user.cumi = 0
if (!isNumber(user.buntal)) user.buntal = 0
if (!isNumber(user.dory)) user.dory = 0
if (!isNumber(user.lumba)) user.lumba = 0
if (!isNumber(user.lobster)) user.lobster = 0
if (!isNumber(user.hiu)) user.hiu = 0
if (!isNumber(user.udang)) user.udang = 0
if (!isNumber(user.orca)) user.orca = 0
if (!isNumber(user.banteng)) user.banteng = 0
if (!isNumber(user.gajah)) user.gajah = 0
if (!isNumber(user.harimau)) user.harimau = 0
if (!isNumber(user.kambing)) user.kambing = 0
if (!isNumber(user.panda)) user.panda = 0
if (!isNumber(user.buaya)) user.buaya = 0
if (!isNumber(user.kerbau)) user.kerbau = 0
if (!isNumber(user.sapi)) user.sapi = 0
if (!isNumber(user.monyet)) user.monyet = 0
if (!isNumber(user.babihutan)) user.babihutan = 0
if (!isNumber(user.babi)) user.babi = 0
if (!isNumber(user.ayam)) user.ayam = 0
if (!isNumber(user.lastadventure)) user.lastadventure = 0
if (!isNumber(user.lastkill)) user.lastkill = 0
if (!isNumber(user.lastmisi)) user.lastmisi = 0
if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
if (!isNumber(user.lastwar)) user.lastwar = 0
if (!isNumber(user.lastsda)) user.lastsda = 0
if (!isNumber(user.lastduel)) user.lastduel = 0
if (!isNumber(user.lastmining)) user.lastmining = 0
if (!isNumber(user.lasthunt)) user.lasthunt = 0
if (!isNumber(user.lastgift)) user.lastgift = 0
if (!isNumber(user.lastberkebon)) user.lastberkebon = 0
if (!isNumber(user.lastdagang)) user.lastdagang = 0
if (!isNumber(user.lasthourly)) user.lasthourly = 0
if (!isNumber(user.lastbansos)) user.lastbansos = 0
if (!isNumber(user.lastrampok)) user.lastrampok = 0
if (!isNumber(user.lastclaim)) user.lastclaim = 0
if (!isNumber(user.lastnebang)) user.lastnebang = 0
if (!isNumber(user.lastweekly)) user.lastweekly = 0
if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
if (!isNumber(user.apel)) user.apel = 0
if (!isNumber(user.anggur)) user.anggur = 0
if (!isNumber(user.jeruk)) user.jeruk = 0
if (!isNumber(user.mangga)) user.mangga = 0
if (!isNumber(user.pisang)) user.pisang = 0
if (!isNumber(user.makanan)) user.makanan = 0
if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
if (!isNumber(user.bibitapel)) user.bibitapel = 0
if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
if (!isNumber(user.horse)) user.horse = 0
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.horseexp)) user.horseexp = 0
if (!isNumber(user.cat)) user.cat = 0
if (!isNumber(user.catexp)) user.catexp = 0
if (!isNumber(user.fox)) user.fox = 0
if (!isNumber(user.foxhexp)) user.foxexp = 0
if (!isNumber(user.dog)) user.foxexp = 0
if (!isNumber(user.dogexp)) user.dogexp = 0
if (!isNumber(user.robo)) user.robo = 0
if (!isNumber(user.roboexp)) user.roboexp = 0
if (!isNumber(user.horselastfeed)) user.horselastfeed = 0
if (!isNumber(user.catlastfeed)) user.catlastfeed = 0
if (!isNumber(user.robolastfeed)) user.robolastfeed = 0
if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0
if (!isNumber(user.doglastfeed)) user.doglastfeed = 0
if (!isNumber(user.robo)) user.robo = 0
if (!isNumber(user.robodurability)) user.robodurability = 0
if (!isNumber(user.armor)) user.armor = 0
if (!isNumber(user.armordurability)) user.armordurability = 0
if (!isNumber(user.sword)) user.sword = 0
if (!isNumber(user.sworddurability)) user.sworddurability = 0
if (!isNumber(user.pickaxe)) user.pickaxe = 0
if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
if (!isNumber(user.fishingrod)) user.fishingrod = 0
if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.limit)) user.limit = limitUser
} else global.db.data.users[m.sender] = {
afkTime: -1,
afkReason: '',
limit: limitUser,
money: 30000,
exp: 0,
limit: 50,
freelimit: 0,
lastclaim: 0,
skata: 0,
registered: true,
name: m.name,
pc: 0,
joinlimit: 1,
age: -1,
regTime: -1,
unreg: false,
afk: -1,
afkReason: '',
banned: false,
bannedTime: 0,
warning: 0,
level: 0,
rokets: 0,
role: 'Beginner',
skill: '',
ojekk: 0,
WarnReason: '',
chip: 0,
bank: 0,
atm: 0,
fullatm: 0,
health: 100,
potion: 10,
trash: 0,
wood: 0,
rock: 0,
string: 0,
emerald: 0,
diamond: 0,
gold: 0,
iron: 0,
common: 0,
uncommon: 0,
mythic: 0,
legendary: 0,
umpan: 0,
pet: 0,
horse: 0,
horseexp: 0,
horselastfeed: 0,
cat: 0,
catexp: 0,
catlastfeed: 0,
fox: 0,
foxexp: 0,
foxlastfeed: 0,
robo: 0,
roboexp: 0,
robolastfeed: 0,
dog: 0,
dogexp: 0,
doglastfeed: 0,
paus: 0,
kepiting: 0,
gurita: 0,
cumi: 0,
buntal: 0,
dory: 0,
lumba: 0,
lobster: 0,
hiu: 0,
udang: 0,
ikan: 0,
orca: 0,
banteng: 0,
harimau: 0,
gajah: 0,
kambing: 0,
buaya: 0,
kerbau: 0,
sapi: 0,
monyet: 0,
babi: 0,
ayam: 0,
armor: 0,
armordurability: 0,
sword: 0,
sworddurability: 0,
pickaxe: 0,
pickaxedurability: 0,
fishingrod: 0,
fishingroddurability: 0,
robo: 0,
robodurability: 0,
apel: 20,
pisang: 0,
anggur: 0,
mangga: 0,
jeruk: 0,
lastadventure: 0,
lastkill: 0,
lastmisi: 0,
lastdungeon: 0,
lastwar: 0,
lastsda: 0,
lastduel: 0,
lastmining: 0,
lasthunt: 0,
lastgift: 0,
lastberkebon: 0,
lastdagang: 0,
lasthourly: 0,
lastbansos: 0,
lastrampok: 0,
lastclaim: 0,
lastnebang: 0,
lastweekly: 0,
lastmonthly: 0
}
} catch (err) {
console.log(err)
}    

 
  async function pinterest2(query) {
	return new Promise(async (resolve, reject) => {
		const baseUrl = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
		const queryParams = {
			source_url: '/search/pins/?q=' + encodeURIComponent(query),
			data: JSON.stringify({
				options: {
					isPrefetch: false,
					query,
					scope: 'pins',
					no_fetch_context_on_resource: false
				},
				context: {}
			}),
			_: Date.now()
		};
		const url = new URL(baseUrl);
		Object.entries(queryParams).forEach(entry => url.searchParams.set(entry[0], entry[1]));
		try {
			const json = await (await fetch(url.toString())).json();
			const results = json.resource_response?.data?.results?? [];
			const result = results.map(item => ({
				pin: 'https://www.pinterest.com/pin/' + item.id?? '',
				link: item.link?? '',
				created_at: (new Date(item.created_at)).toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				}) ?? '',
				id: item.id?? '',
				images_url: item.images?.['736x']?.url?? '',
				grid_title: item.grid_title?? ''
			}));
			resolve(result);
		} catch (e) {
			reject([])
		}
	});
}  

//~~~~~~~~~~~~~~~~SETTING TIME~~~~~~~~~~~~~~~~~~~~\\                                
  const xtime = moment.tz("Africa/Kampala").format("HH:mm:ss");
  const xdate = moment.tz("Africa/Kampala").format("DD/MM/YYYY");
  const time2 = moment().tz("Africa/Kampala").format("HH:mm:ss");
  if (time2 < "23:59:00") {
    var timewisher = `Good Evening`;
  }
  if (time2 < "19:00:00") {
    var timewisher = `Good Evening`;
  }
  if (time2 < "18:00:00") {
    var timewisher = `Good Afternoon`;
  }
  if (time2 < "15:00:00") {
    var timewisher = `Good Afternoon`;
  }
  if (time2 < "11:00:00") {
    var timewisher = `Good Morning`;
  }
  if (time2 < "05:00:00") {
    var timewisher = `Good Morning`;
  }
  // Current time in Africa/Kampala timezone
  let sekarang = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Kampala" }),
  );
  // Date helper functions
  function tanggal(ms) {
    return new Date(ms).getDate().toString().padStart(2, "0");
  }
  function bulan(ms) {
    return (new Date(ms).getMonth() + 1).toString().padStart(2, "0"); // +1 because January = 0
  }
  function tahun(ms) {
    return new Date(ms).getFullYear();
  }
  // Time formatter hh:mm:ss
  function formatJam(date) {
    let jam = date.getHours().toString().padStart(2, "0");
    let menit = date.getMinutes().toString().padStart(2, "0");
    let detik = date.getSeconds().toString().padStart(2, "0");
    return `${jam}:${menit}:${detik}`;
  }
  // Final output
  let futureDescription = `
📅 *Exchange Update:* ${tanggal(sekarang.getTime())}/${bulan(sekarang.getTime())}/${tahun(sekarang.getTime())}
🕰 *Kampala Time (WIB):* ${formatJam(sekarang)}`;
    
//~~~~~~~~~~~~~~~~~SETTING QUOTED~~~~~~~~~~~~~~~~~~~~\\                  
const fverif = {
    key: {
      remoteJid: "0@s.whatsapp.net",
      participant: "0@s.whatsapp.net",
      fromMe: false,
      id: "",
    },
    message: {
      conversation: `*𑜿ًًًًًًًًًًࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧя𑲭𑲭𑲭𑲭𑲭𑲭𑲭𖠘𖠦𖠥𖠢𖠛𖠨𖠫𖠱𖠸𖠸𓃱𓃰𓃠𓃥𓆦𓆉𖨆𖨆𓆏𓃯𓃭𓃵𓃙𓃟𓃝𓀴𓀲𓀱𓀧𓀨𓀬𓀫𓀪𓀧𓀦𓀞𓀩𓀫𓀤𓀣𓀡𓀞*`,
    },
  };

const fgclink = {
    key: {
      participant: "0@s.whatsapp.net",
      remoteJid: "0@s.whatsapp.net",
    },
    message: {
      groupInviteMessage: {
        groupJid: "120363402052133400@g.us",
        inviteCode: "LVtMOpKXWogECSmtBylUix",
        groupName: `${global.namabot}`,
        caption: `${pushname}`,
        jpegThumbnail: `https://files.catbox.moe/91n3vx.jpg`,
      },
    },
  };

const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `${ownername}`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=${ownernumber}:${NoPushkontak}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}  
    
 const reply = (teks) => {
    conn.sendMessage(m.chat, { 
        text: teks,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                showAdAttribution: false, 
                containsAutoReply: true,
                title: `ᴀɴᴏɴʏᴍᴏᴜs ᴍᴅ`,
                body: `Hello ${pushname} 👋🏻`,
                previewType: "PHOTO",
                thumbnailUrl: `https://files.catbox.moe/91n3vx.jpg`,
                thumbnail: ``,
                sourceUrl: `https://youtube.com/@Terrizev`
            }
        }
    }, { quoted: m });
};

async function daftar(tekz) {
const daftar = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: `ANONYMOUS X VERONICA AI`,
newsletterJid: `120363397100406773@newsletter`,
},
externalAdReply: {  
title: `PLEASE REGISTER FIRST`,
body: 'Register to the ANONYMOUS MD database',
thumbnailUrl: `https://files.catbox.moe/91n3vx.jpg`,
mediaType: 1,
renderLargerThumbnail: true,
},
},
text: tekz,
}
return conn.sendMessage(m.chat, daftar, {
quoted: m,
})
}
    
    
const reply2 = async (teks) => {
    await conn.sendMessage(
      from,
      {
        text: teks,
        contextInfo: {},
      },
      {
        quoted: m,
      },
    );
  };


const example = (teks) => {
return `\n *Usage Example :*\n Type *${prefix+command}* ${teks}\n`
}

//~~~~~~~~~~~~~~~~CONSOLE LOG~~~~~~~~~~~~~~~~~~~\\                  
if (!conn.public && !m.key.fromMe && !global.ownernumber.includes(m.sender.split("@")[0])) {
  return;
}

if (m.message) {
    const time = chalk.yellow(moment().tz('Africa/Kampala').format('DD/MM/YYYY HH:mm:ss'))
    const msgType = chalk.cyan(budy ? budy : m.mtype)
    const sender = `${chalk.green(pushname)} ${chalk.gray(`<${m.sender}>`)}`
    const location = m.isGroup
        ? `${chalk.blue('Group:')} ${chalk.yellow(groupName)} ${chalk.gray(`(${m.chat})`)}`
        : chalk.blue('Private Chat')
    console.log(
`${chalk.white('┌' + '─'.repeat(15) + '[ NEW MESSAGE ]' + '─'.repeat(16) + '┐')}
📅 ↳ ${time}
💬 ↳ ${msgType}
🙋 ↳ ${sender}
📍 ↳ ${location}
${chalk.white('└' + '─'.repeat(50) + '┘')}`
    )
}


//~~~~~~~~~~~~~~~~~ALL FUNCTION~~~~~~~~~~~~~~~~~~~~~\\                                  
  async function sendconnMessage(chatId, message, options = {}) {
    let generate = await generateWAMessage(chatId, message, options);
    let type2 = getContentType(generate.message);
    if ("contextInfo" in options)
      generate.message[type2].contextInfo = options?.contextInfo;
    if ("contextInfo" in message)
      generate.message[type2].contextInfo = message?.contextInfo;
    return await conn.relayMessage(chatId, generate.message, {
      messageId: generate.key.id,
    });
  }
  
  function GetType(Data) {
    return new Promise((resolve, reject) => {
      let Result, Status;
      if (Buffer.isBuffer(Data)) {
        Result = new Buffer.from(Data).toString("base64");
        Status = 0;
      } else {
        Status = 1;
      }
      resolve({
        status: Status,
        result: Result,
      });
    });
  }
  
  function randomId() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  
  function monospace(string) {
    return '```' + string + '```'
}

function monospa(string) {
    return '`' + string + '`'
}

function getRandomFile(ext) {
return `${Math.floor(Math.random() * 10000)}${ext}`;
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

function randomNomor(min, max = null){
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}

function generateRandomPassword() {
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
const length = 10;
let password = '';
for (let i = 0; i < length; i++) {
const randomIndex = Math.floor(Math.random() * characters.length);
password += characters[randomIndex];
}
return password;
}

function generateRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
const totalFitur = () =>{
   var mytext = fs.readFileSync("./Anonymous.js").toString()
  var numUpper = (mytext.match(/case '/g) || []).length;
     return numUpper
        }
        
//~~~~~~~~~~~~~~~~PLUGINS~~~~~~~~~~~~~~~~~~~~~~\\ 
    const pluginsLoader = async (directory) => {
      let plugins = [];
      const folders = fs.readdirSync(directory);
      folders.forEach((file) => {
        const filePath = path.join(directory, file);
        if (filePath.endsWith(".js")) {
          try {
            const resolvedPath = require.resolve(filePath);
            if (require.cache[resolvedPath]) {
              delete require.cache[resolvedPath];
            }
            const plugin = require(filePath);
            plugins.push(plugin);
          } catch (error) {
            console.log(`Error loading plugin at ${filePath}:`, error);
          }
        }
      });
      return plugins;
    };

    let pluginsDisable = true;
    const plugins = await pluginsLoader(path.resolve(__dirname, "Anonycmd"));
    const plugn = { conn, prefix, command, reply, reply2, text, isGroup: m.isGroup, isCreator, example, sender, senderNumber, pushname, args, runtime, formatp, sleep, getBuffer, isBotAdmins, isAdmins, isPremium, randomNomor, monospace, pickRandom, getRandomFile };
    for (let plugin of plugins) {
      if (plugin.command.find((e) => e == command.toLowerCase())) {
        pluginsDisable = false;
        if (typeof plugin !== "function") return;
        await plugin(m, plugn);
      }
    }
    if (!pluginsDisable) return;
//~~~~~~~~~~~~~~~~~~~CASE~~~~~~~~~~~~~~~~~~~~~~\\     
                 
switch (command) {

case 'play': {
  if (!isRegistered) return daftar(`You are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`);
  if (!text) return reply('Please provide a song name or query!\nExample: .play Shape of You');

  try {
    await conn.sendMessage(m.chat, { react: { text: "🎵", key: m.key } });

    const apiUrl = `https://api.diioffc.web.id/api/search/ytplay?query=${encodeURIComponent(text)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.result) return reply('Failed to fetch song. Try another query.');

    const res = data.result;
    // Store last search result for button handlers (per chat)
    global.lastPlayResult = global.lastPlayResult || {};
    global.lastPlayResult[m.chat] = res;

    const info = `
        \`*ANONYMOUS DWNLOADER*\`
🎵 *Title*: ${res.title}
👤 *Author*: ${res.author?.name || '-'}
🔗 *YouTube*: ${res.url}
🕒 *Duration*: ${res.duration?.timestamp || '-'}
👁️ *Views*: ${res.views}
📅 *Uploaded*: ${res.ago}
`;
    const buttons = [
      {buttonId: `.playdoc`, buttonText: {displayText: "Document"}, type: 1},
      {buttonId: `.playaudio`, buttonText: {displayText: "Audio"}, type: 1},
      {buttonId: `.playvn`, buttonText: {displayText: "Voice Note"}, type: 1}
    ];

    await conn.sendMessage(m.chat, {
        image: { url: res.thumbnail },
        caption: info,
        footer: "Choose format below:",
        buttons: buttons,
        headerType: 4
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply('❌ Error fetching song data.');
  }
}
break;

case 'playdoc': {
  if (!isRegistered) return daftar('You are not registered, register to use bot features');
  let res = global.lastPlayResult?.[m.chat];
  if (!res) return reply('No song found. Use .play <songname> first.');
  await conn.sendMessage(m.chat, {
    document: { url: res.download.url },
    fileName: res.download.filename,
    mimetype: "audio/mpeg",
    caption: `${res.title}`
  }, { quoted: m });
}
break;

case 'playaudio': {
  if (!isRegistered) return daftar('You are not registered, register to use bot features');
  let res = global.lastPlayResult?.[m.chat];
  if (!res) return reply('No song found. Use .play <songname> first.');
  await conn.sendMessage(m.chat, {
    audio: { url: res.download.url },
    mimetype: "audio/mpeg",
    fileName: res.download.filename
  }, { quoted: m });
}
break;

case 'playvn': {
  if (!isRegistered) return daftar('You are not registered, register to use bot features');
  let res = global.lastPlayResult?.[m.chat];
  if (!res) return reply('No song found. Use .play <songname> first.');
  await conn.sendMessage(m.chat, {
    audio: { url: res.download.url },
    mimetype: "audio/mpeg",
    ptt: true,
    fileName: res.download.filename
  }, { quoted: m });
}
break;

case 'menu': {
let menu = `
──「 ${botname} 」──
[✦] User Status : ${isCreator ? 'owner' : isPremium ? 'premium' : 'free'}
[✦] Mode: ${conn.public ? '✱ Public' : '✲ Self'}
[✦] Prefix: Multi
[✦] Developer terri 
[✦] Version: 5.0.0`;
 const buttons = [
 {
 buttonId: ".ping",
 buttonText: { displayText: 'SPEED' }
 }
 ];
 let buttonMessage = {
 image: { url: `https://files.catbox.moe/91n3vx.jpg` },
 caption: `${menu}`,
 contextInfo: {
 forwardingScore: 99,
 isForwarded: true,
 forwardedNewsletterMessageInfo: {
 newsletterName: global.newslettername,
 newsletterJid: "120363397100406773@newsletter"
 }
 },
 footer: global.wmarthazy,
 buttons: buttons,
 viewOnce: true,
 headerType: 4
 };
 const flowActions = [
 {
 buttonId: 'action',
 buttonText: { displayText: 'This Button List' },
 type: 4,
 nativeFlowInfo: {
 name: 'single_select',
 paramsJson: JSON.stringify({
 title: "Anonymous Menu List",
 sections: [
 {
 title: "Anonymous Popular Menu",
 highlight_label: "allmenu",
 rows: [
 {
 header: "show all menu",
 title: "Show All Bot Menu",
 description: "Display the entire bot menu",
 id: ".allmenu"
 },
 {
 header: "show main menu",
 title: "MAIN MENU",
 description: "Display the Main Menu",
 id: ".mainmenu"
 },
 {
 header: "show owner menu",
 title: "OWNER MENU",
 description: "Display the Owner Menu",
 id: ".ownermenu"
 },
 {
 header: "show downloader menu",
 title: "DOWNLOADER MENU",
 description: "Display the Downloader Menu",
 id: ".downloadmenu"
 },
 {
 header: "show maker menu",
 title: "MAKER MENU",
 description: "Display Sticker Maker Menu",
 id: ".stickermenu"
 },
 {
 header: "show bug menu",
 title: "BUG MENU",
 description: "Display the Bug Menu",
 id: ".bugmenu"
 },
 {
 header: "show nfsw menu",
 title: "NFSW MENU",
 description: "Display the NFSW Menu",
 id: ".nfswmenu"
 },
 {
 header: "show cpanel menu",
 title: "CPANEL MENU",
 description: "Display the Cpanel Menu",
 id: ".cpanelmenu"
 }, 
 {
 header: "show group menu",
 title: "GROUP MENU",
 description: "Display the Group Menu",
 id: ".groupmenu"
 }, 
 {
 header: "show convert menu",
 title: "CONVERT MENU",
 description: "Display the Convert Menu",
 id: ".convertmenu"
 }, 
 {
 header: "show push menu",
 title: "PUSH CONTACT MENU",
 description: "Display the Push Contact Menu",
 id: ".pushmenu"
 }, 
 {
 header: "show rpg menu",
 title: "RPG MENU",
 description: "Display the Rpg Menu",
 id: ".rpgmenu"
 }, 
 ]
 }
 ]
 })
 },
 viewOnce: false
 } 
 ];
 buttonMessage.buttons.push(...flowActions);
 await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};
break

case "runtime": {
   let lowq = `*Anonymous MD has been online for:*\n${runtime(
          process.uptime(),
        )}*`;
        m.reply(`${lowq}`);
      }
      break

case "listgc": {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
    if (!isCreator) return

    try {
        let allGroups = await conn.groupFetchAllParticipating();
        let groupList = Object.values(allGroups);

        let teks = `*GROUP LIST*\n\nTotal: ${groupList.length} groups\n\n`;

        for (let group of groupList) {
            teks += `*${group.subject}*\nID: ${group.id}\nMembers: ${group.participants.length}\n\n`;
        }

        await conn.sendText(m.chat, teks, m);
    } catch (error) {
        await conn.sendText(m.chat, "❌ Failed to fetch group list.", m);
    }
}
break
            
case 'getcase':
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isCreator) return reply(mess.creator)
if (!text) return reply(`Which case do you want to get? `)
const getCase = (cases) => {
return "case" + `'${cases}'` + fs.readFileSync("./case.js").toString().split('case \'' + cases + '\'')[1].split("break")[0] + "break"
}
m.reply(`${getCase(q)}`)
break
                
case 'removebg': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
	 if (!quoted) return reply(`Send/Reply Image With Caption ${command}`)
	 if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${command}`)
	 if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${command}`)
	 let { removeBg } = require('./lib/removeBG')
	 let img = await quoted.download()
	 let image = await removeBg(img)
	 let result = await Buffer.from(image, "base64")
	 
	 conn.sendImage(m.chat, result, mess.success, m)
}
break

case "backupouka":{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.10`)
if (!isCreator) return reply(mess.creator)
const { execSync } = require("child_process");
const ls = (await execSync("ls")).toString().split("\n").filter(
 (pe) =>
pe != "node_modules" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != "tmp" &&
pe != ""
);
const exec = await execSync(`zip -r backup.zip ${ls.join(" ")}`);
await conn.sendMessage(m.chat, { document: await fs.readFileSync("./backup.zip"), mimetype: "application/zip", fileName: "scriptBackup.zip",},{quoted: m}); await execSync("rm -rf backup.zip");
 }
 break
 

case 'clearsession':
case 'clearsesi': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.10`)
if (!isCreator) return reply(mess.creator)
 const fs = require('fs')
 const path = require('path')

 const sessionFolder = './session'
 const rootFiles = fs.readdirSync('./')
 const sampahPatterns = [
 /^qr.*\.jpg$/i,
 /^ss.*\.jpg$/i,
 /^ss.*\.png$/i,
 /^preview.*\.(temp|tmp|jpg|png)$/i,
 /^dump.*\.(zip|txt|json)$/i,
 /^temp.*\.(zip|json|txt)$/i,
 /^debug.*\.(txt|log)$/i,
 /^backup.*\.zip$/i,
 /^cache.*\.(zip|json)$/i,
 ]

 let deleted = []

 // Delete contents of session folder
 if (fs.existsSync(sessionFolder)) {
 fs.readdirSync(sessionFolder).forEach(file => {
 const fullPath = path.join(sessionFolder, file)
 fs.unlinkSync(fullPath)
 deleted.push(fullPath)
 })
 }

 // Delete files that match patterns
 for (const file of rootFiles) {
 if (sampahPatterns.some(rx => rx.test(file))) {
 fs.unlinkSync(file)
 deleted.push(file)
 }
 }

 if (deleted.length === 0) {
 return m.reply('✅ No junk files to remove.')
 }

 return m.reply(`*Successfully deleted ${deleted.length} session junk files ✅*`) 
}
break

case 'public': {
if (!isCreator) return reply(mess.owner) 
conn.public = true
reply2('Successfully changed to Public')
}
break

case 'self': {
if (!isCreator) return reply(mess.owner) 
conn.public = false
reply2('Successfully changed to Self')
}
break

case 'totalfitur': case 'totalfeature': {
 reply(`Total Features Currently ${totalFitur()}͏\nif you want to see total plugins type .totalplugin`) 
 }
 break

case 'wangy': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply(`type your name, e.g. ${prefix}wangy apip`)
qq = q.toUpperCase()
awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HA HA HA, aaaah the scent of ${qq}'s hair ❤️ I want to sniff the scent of ${qq} WANGY I want to caress the hair ${qq} AAAAAAAAH ~ The first appearance in anime was so sweet ❤️ ❤️ ❤️ ${qq} AAAAA SO CUTE............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️ what? ${qq} it's not real? Just hallucination you say? No, no no no NOOOOO I DON'T BELIEVE IT'S REAL NOOOOOOO I DON'T CARE ABOUT REALITY AT ALL. ❤️ ❤️ ❤️ ${qq} I ... ${qq} on the laptop looking at me, ${qq} .. do you believe me? aaaaaaaaaaah thank goodness ${q} I don't want to let go of ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAH I STILL HAVE ${qq} EVEN IF I DON'T HAVE IT AAAAAAAAAAAAAAH`
reply(awikwok)
}
break 
 
case 'truth':
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
const trut = ['Who have you ever liked? For how long?', 'If you could, who in the group would you make your closest friend? (can be different gender)', 'What is your biggest fear?', 'Have you ever liked someone and thought they liked you too?', 'Who is the name of your friend\'s ex you secretly liked?', 'Have you ever stolen money from your parents? Why?', 'What cheers you up when you are sad?', 'Have you ever had unrequited love? If yes, with whom? How did it feel?', 'Have you ever been someone\'s affair?', 'What are you most afraid of?', 'Who has the biggest influence on your life?', 'What achievements are you proud of this year?', 'Who makes you horny?', 'Who ever made you horny?', '(for muslims) Have you ever skipped prayers all day?', 'Who here is closest to your ideal partner?', 'Who do you like to play with?', 'Who was your first love?', 'Have you ever rejected someone? Why?', 'Tell an event that hurt you that you still remember', 'What achievements have you gained this year?', 'Worst habit at school?']
const ttrth = trut[Math.floor(Math.random() * trut.length)]
reply(`${ttrth}`) 
break 
 
case 'dare':
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
const dare = ['Take a photo at a cemetery at midnight, dare?', 'Take a photo of the bot, set as your profile picture for 1 day', 'Voice note singing "balonku ada 5"', 'Drink Coca-Cola until finished without burping for 30 seconds', 'Eat 1 chili without water for 2 minutes', 'Dip your phone in water for 30 seconds', 'Voice note "I love you"', 'Sing "potong bebek angsa" (voice note)', 'Send message to your ex saying "I still like you"', 'Call your crush/partner now and screenshot', 'Send message to your ex saying "I still like you"', 'Call your crush/partner now and screenshot', 'Take a selfie and send to one group member', 'Say "YOU ARE VERY BEAUTIFUL NO LIE" to a guy', 'Send recent call screenshot', 'Use the 🤥 emoji every time you type in group for 1 day', 'Send voice note "can i call u baby?"', 'Send a quote and tag members that fit it', 'Use Sule\'s photo for 3 days', 'Type using local dialect for 24 hours', 'Change name to "gue anak lucinta luna" for 5 hours', 'Chat contacts according to battery percentage and tell them "i lucky to hv you"', 'Prank chat your ex and say "i love u, want to get back?"', 'Record voice reading surah al-kautsar', 'Say "i hv crush on you, wanna be my bf/gf?" to the last opposite gender you chatted with', 'Mention your ex names (max 3)', 'Scream a random swear while sending voice note here', 'Scream "anjimm gabutt anjimmm" in front of your house', 'Change name to "BOWO" for 24 hours', 'Pretend to be possessed (example: possessed by cat, grasshopper, fridge, etc.)']
const der = dare[Math.floor(Math.random() * dare.length)]
reply(`${der}`)
break 
 
case 'cekjomok': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply(`type your name, example ${prefix + command} artha`)
const sangeh = ['fomo', 'wild lover', 'ordinary lover', 'saucy', 'premium lover', 'dog lover', 'caught lover', 'cute', 'member ngawi east', 'member ngawi west', 'member ngawi south', 'ambatron', 'ordinary jomok', 'classy jomok', 'premium jomok', 'ambatukam', 'member jmk48', 'atmin jmk48', 'king jomok', 'chairman jomok']
const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
reply(`Question : ${command} ${q}\nAnswer : ${sange}`)
}
break 

case 'kapankah': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply(`what? example ${prefix + command} i will marry`)
const kapan = ['In 5 days', 'In 10 days', 'In 15 days', 'In 20 days', 'In 25 days', 'In 30 days', 'In 35 days', 'In 40 days', 'In 45 days', 'In 50 days', 'In 55 days', 'In 60 days', 'In 65 days', 'In 70 days', 'In 75 days', 'In 80 days', 'In 85 days', 'In 90 days', 'In 95 days', 'In 100 days', 'In 5 months', 'In 10 months', 'In 15 months', 'In 20 months', 'In 25 months', 'In 30 months', 'In 35 months', 'In 40 months', 'In 45 months', 'In 50 months', 'In 55 months', 'In 60 months', 'In 65 months', 'In 70 months', 'In 75 months', 'In 80 months', 'In 85 months', 'In 90 months', 'In 95 months', 'In 100 months', 'In 1 year', 'In 2 years', 'In 3 years', 'In 4 years', 'In 5 years', 'Tomorrow', 'The day after tomorrow', `After this command also you ${q}`]
const kapankah = kapan[Math.floor(Math.random() * kapan.length)]
reply(`Question : ${command} ${q}\nAnswer : ${kapankah}`)
}
break 
 
case 'cantikcek': case 'cekcantik': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply(`type your name, example ${prefix + command} sechan`)
const can = ['10% needs more care :v\nJust kidding', '30% Keep taking care > <', '20% Keep the spirit 👍', '40% Wow', '50% you are pretty', '60% Hello beautiful', '70% Hello sis', '62% Pretty!', '74% Pretty indeed', '83% Love you', '97% Assalamualaikum', '100% Are you using charm?', '29% Keep the spirit :)', '94% Hello beautiful', '75% Hey pretty', '82% Looks like you do facial care', '41% Keep going :)', '39% More spirit']
const tik = can[Math.floor(Math.random() * can.length)]
reply(`Question : ${command} ${q}\nAnswer : ${tik}`)
}
break 
 
case 'gantengcek': case 'cekganteng': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply(`type your name, example ${prefix + command} rapik`)
const gan = ['10% you need care :v\nJoking', '30% Keep the spirit', '20% Keep the spirit 👍', '40% Wow', '50% You are handsome', '60% Hello handsome', '70% Hello handsome', '62% Handsome!', '74% Very handsome', '83% Love You', '97% Assalamualaikum', '100% Using charm?', '29% Keep the spirit :)', '94% Hello handsome', '75% Hey handsome', '82% Looks like you take care often', '41% Keep going :)', '39% More spirit']
const teng = gan[Math.floor(Math.random() * gan.length)]
reply(`Question : ${command} ${q}\nAnswer : ${teng}`)
}
break 
 
 case 'apakah': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`what? example ${prefix + command} i'm an otaku`)
 const apa = ['Yes', 'No', 'Maybe', 'Correct']
 const kah = apa[Math.floor(Math.random() * apa.length)]
 reply(`question : does ${q}\nanswer : ${kah}`)
 }
 break
 
 case 'bisakah': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`what? example ${prefix + command} i become president`)
 const bisa = ['Can', 'Cannot', 'Nope', 'OF COURSE YOU CAN!!!!', 'ride a dog instead']
 const ga = bisa[Math.floor(Math.random() * bisa.length)]
 reply(`question : can ${q}\nanswer : ${ga}`)
 } 
 break

 case 'bagaimanakah': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`what? example ${prefix + command} how to heal a broken heart`)
 const gimana = ['No idea', 'That is difficult', 'Sorry, bot cannot answer', 'Try searching on Google', 'astaghfirallah Really???', 'I\'m dizzy', 'Oh I see :(', 'How to...']
 const ya = gimana[Math.floor(Math.random() * gimana.length)]
 reply(`question : how is ${q}\nanswer : ${ya}`)
 }
 break
 
 case 'cekkhodam': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`type your name, example ${prefix + command} rido`)
 let who
 if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
 const anunya = [
	 "Avian Paint Can",
	 "Rucika Pipe",
	 "Tupperware Bottle",
	 "Mixue Clown",
	 "GIV Soap",
	 "Swallow Sandal",
	 "Jarjit",
	 "Ijat",
	 "Fizi",
	 "Mail",
	 "Ehsan",
	 "Upin",
	 "Ipin",
	 "whisker cat",
	 "Tok Dalang",
	 "Opah",
	 "Opet",
	 "Alul",
	 "Pak Vinsen",
	 "Maman Resing",
	 "Pak RT",
	 "Admin ETI",
	 "Bung Towel",
	 "Wet Lumpia",
	 "Martabak Manis",
	 "Baso Tahu",
	 "Tahu Gejrot",
	 "Dimsum",
	 "Seblak Ceker",
	 "Rolled Egg",
	 "Tahu Aci",
	 "Tempe Mendoan",
	 "Nasi Kucing",
	 "Kue Cubit",
	 "Tahu Sumedang",
	 "Nasi Uduk",
	 "Wedang Ronde",
	 "Shrimp Crackers",
	 "Cilok",
	 "Cilung",
	 "Cream Puff",
	 "Jasuke",
	 "Seblak Makaroni",
	 "Sate Padang",
	 "Sayur Asem",
	 "Kromboloni",
	 "Pink Hamster",
	 "Flying Leech",
	 "Orange Cat",
	 "Lintah Terbang",
	 "Singa Paddle Pop",
	 "Macan Cisewu",
	 "Vario Mber",
	 "Beat Mber",
	 "Supra Geter",
	 "Side Oil",
	 "Exhaust Racing",
	 "Strawberry Juice",
	 "Avocado Juice",
	 "Shaken Avocado",
	 "Es Kopyor",
	 "Orange Juice",
	 "Cappuccino Cincau",
	 "Jasjus Melon",
	 "Apple Tea Juice",
	 "Mango Pop Ice",
	 "Gulabatu Tea Juice",
	 "Drain Water",
	 "Washing Water",
	 "Pot Lid",
	 "Donation Box",
	 "Thermos Lid",
	 "Bottle Cap",
	 "Black Plastic Bag",
	 "Charger Head",
	 "Spare Tire",
	 "Folding Chair",
	 "Rocking Chair",
	 "Banana Peel",
	 "Madura Stall",
	 "Drainage",
]
 function getRandomKhodam() {
 const randomKhodam = Math.floor(Math.random() * anunya.length);
 return anunya[randomKhodam];
}
const khodam = getRandomKhodam()
 const response = ` 
> *Name :* ${text}
> *Khodam :* ${khodam}`
 reply(response)
 }
 break;
 
 case 'sangecek': case 'ceksange': case 'gaycek': case 'cekgay': case 'lesbicek': case 'ceklesbi': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply(`type your name, example ${prefix + command} rido`)
const sangeh = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%']
const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
reply(`Question : ${command} ${q}\nAnswer : ${sange}%`)
}
break

case 'qc':
    case 'qcstic': {
      if (!args[0]) return m.reply(`Example: .qc white halo`)
      if (text.length > 100) return m.reply(`Maximum 100 characters!`)
      await conn.sendMessage(m.chat, {
 react: {
 text: '⏳',
 key: m.key
 }
 });
      let message = text
      let backgroundColor = '#ffffff'
      const username = db.data.users[m.sender].nama
      const avatar = await conn.profilePictureUrl(m.sender, "image").catch(() => 'https://files.catbox.moe/nwvkbt.png')
      const json = {
        type: 'quote',
        format: 'png',
        backgroundColor,
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: username,
            photo: {
              url: avatar
            }
          },
          text: message,
          replyMessage: {}
        }]
      }
      const response = await axios.post('https://bot.lyo.su/quote/generate', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const buffer = Buffer.from(response.data.result.image, 'base64')
      conn.sendImageAsSticker(m.chat, buffer, m, {
        packname: packname,
        author: author
      })
    }
    break

   case 'smeme': case 'stickermeme': case 'stickmeme': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!/webp/.test(mime) && /image/.test(mime)) {
if (!text) return reply(`Send/Reply Image With Caption ${prefix + command}
 text1|text2`)
atas = text.split('|')[0] ? text.split('|')[0] : '-'
bawah = text.split('|')[1] ? text.split('|')[1] : '-'
mee = await conn.downloadAndSaveMediaMessage(quoted)
mem = await UploadFileUgu(mee)
meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem.url}`
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
memek = await conn.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} else {
reply(`Send/Reply Image With Caption ${prefix + command}
 text1|text2`)
}
}
break

case 'deepimg': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return m.reply("Enter an image prompt.")
 m.reply("Processing the image, please wait...")

 try {
const axios = require('axios');
 let { data } = await axios.post("https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev", {
 prompt: text,
 size: "1024x1024",
 device_id: `dev-${Math.floor(Math.random() * 1000000)}`
 }, {
 headers: {
 "Content-Type": "application/json",
 Origin: "https://deepimg.ai",
 Referer: "https://deepimg.ai/"
 }
 })
 let imageUrl = data?.data?.images?.[0]?.url
 if (!imageUrl) return m.reply("Failed to create image. Try changing the prompt.")
 await conn.sendMessage(m.chat, { 
 image: { url: imageUrl }, 
 caption: `🖼️ *Image Created!*\n📜 *Prompt:* ${text}` 
 }, { quoted: m })
 } catch (err) {
 console.error(err.response ? err.response.data : err.message)
 m.reply("An error occurred while processing the image.")
 }
}
break

case 'tourl': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!/image|video|audio|webp/.test(mime)) return m.reply(' Send media first\nexample: reply media then type .tourl\nsupported media: image, video, audio, sticker');

 const media = await conn.downloadAndSaveMediaMessage(quoted);
 try {
 const catBoxUrl = await CatBox(media);
 if (!catBoxUrl) throw 'Failed to get URL from Catbox';

 const teks = `tourl success\ntype: catbox\npress the copy url button to copy the catbox link!`;

 const msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 messageContextInfo: {
 deviceListMetadata: {},
 deviceListMetadataVersion: 2
 },
 interactiveMessage: proto.Message.InteractiveMessage.fromObject({
 contextInfo: { mentionedJid: [m.sender] },
 body: proto.Message.InteractiveMessage.Body.fromObject({ text: teks }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
 buttons: [
 {
 name: 'cta_copy',
 buttonParamsJson: JSON.stringify({
 display_text: '📑 Copy URL',
 copy_code: catBoxUrl
 })
 }
 ]
 })
 })
 }
 }
 }, { userJid: m.chat, quoted: m });

 await conn.relayMessage(msg.key.remoteJid, msg.message, { 
messageId: msg.key.id 
});

 } catch (err) {
 console.error('Tourl error:', err);
 m.reply('❌ Failed to upload media to URL.');
 } finally {
 if (fs.existsSync(media)) fs.unlinkSync(media);
 }
}
break;

case 'owner': {
 let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; ${global.ownername}\nORG: ${global.ownername}\nTITLE:soft\nitem1.TEL;waid=${global.ownernumber}:${global.ownernumber}\nitem1.X-ABLabel:Phone\nitem2.URL:${global.yt}\nitem2.X-ABLabel:More\nitem3.EMAIL;type=INTERNET: ${global.website}\nitem3.X-ABLabel:Email\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABADR:More\nitem4.X-ABLabel:Location\nEND:VCARD`;
const sentMsg = await conn.sendMessage(m.chat, {
 contacts: {
 displayName: author,
 contacts: [{ vcard }],
 },
 contextInfo: {
 externalAdReply: {
 title: `MY OWNER - ${ownername}`,
 body: "",
 thumbnailUrl: `https://files.catbox.moe/91n3vx.jpg`,
 mediaType: 1,
 showAdAttribution: true,
 renderLargerThumbnail: false,
 }}}, { quoted: m });
}
break

      case 'daftar': case 'regis': case 'register': {
    if (isRegistered) return reply('You are already registered🐦');

    const input = text?.includes(',') ? text.split(',') : text?.includes('.') ? text.split('.') : [];
    if (input.length !== 2) return reply('example: .register name.age');

    const nama = input[0].trim();
    const umur = input[1].trim();

    if (!nama || !umur || isNaN(umur)) return reply('Make sure Name and Age are filled correctly!');
    if (parseInt(umur) > 40) return reply('Sorry, Maximum Age For Registration Is 40 Years!');

     const nomor = m?.sender.split('@')[0];
    const serialUser = createSerial(8);
    const channelJid = '120363397100406773@newsletter';

const mzd = `—REGISTERED USER—
👤 Name   : ${nama}
🗓️ Age ${umur}
🆔 Serial : ${serialUser}

> Successfully Registered To The Database ✅`
const notifLog = `NOTIF REGISTER
================
👤 Name   : ${nama}
🗓️ Age   : ${umur}
🆔 Serial : ${serialUser}
================`
    veri = m?.sender;
    addRegisteredUser(m?.sender, nama, serialUser);

    let ppuser;
    try {
        ppuser = await conn.profilePictureUrl(m.sender, 'image');
    } catch {
        ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460960720.png?q=60';
    }

    conn.sendMessage(m.chat, {
        text: mzd,
        contextInfo: {
            mentionedJid: [m.chat],
            externalAdReply: {
                showAdAttribution: true,
                title: '𝗡 𝗘 𝗪 - 𝗨 𝗦 𝗘 𝗥',
                body: '',
                thumbnailUrl: ppuser,
                sourceUrl: 'https://www.youtube.com/@Terrizev',
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });

    conn.sendMessage(channelJid, {
        text: notifLog,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: 'System Notification',
                body: 'Notification Register',
                thumbnailUrl: ppuser,
                sourceUrl: 'https://www.youtube.com/@Terrizev',
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    });
    // ✅ Additional: Auto Backup
    try {
        const ownerList = global.owner || ['25654550399'] // change to owner number
        for (let ow of ownerList) {
            let jid = ow.includes('@s.whatsapp.net') ? ow : ow + '@s.whatsapp.net'
            await conn.sendMessage(jid, {
                document: fs.readFileSync('./lib/database/registered.json'),
                fileName: 'registered.json',
                mimetype: 'application/json',
                caption: `📦 Auto Backup - New User: ${nama}`
            }, { quoted: m })
        }
    } catch (err) {
        console.log('Failed to send auto-backup:', err)
    }
}
break;          
        
case 'jpm':{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isCreator) return reply(mess.creator) 
if (!text) return reply(`*Usage Error example\n${prefix+command} text|delay\n\n1 second = 1000, 2 seconds = 2000 and so on`)
await reply("Please wait, processing")
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
let metadat72 = await conn.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await conn.downloadAndSaveMediaMessage(quoted)
mem = await uploadwidipe(media)
await conn.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
} else {
await conn.sendMessage(xnxx, { text: text.split('|')[0]})
await sleep(text.split('|')[1])
}}
reply("Successfully Sent 😎")
}
break

case 'dor':
			case 'kick': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!m.isGroup) return reply2('This command can only be used in groups 🤭');
				if (!isCreator && !isAdmins) return reply2('sorry, this feature can only be accessed by admin & bot owner');
				if (!isBotAdmins) return reply2('Bot is not an admin yet, please make the bot an admin first');
				if (!m.quoted && !m.mentionedJid[0] && isNaN(parseInt(args[0]))) {
					return reply2('who do you want to kick? tag them 🤭');
				}
				let users = m.mentionedJid[0] 
				? m.mentionedJid[0] 
				: m.quoted 
				? m.quoted.sender 
				: text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
				if (ownernumber.includes(users.replace('@s.whatsapp.net', ''))) {
					return reply2('that is my owner, do not kick them 🥺');
				}
				try {
					await conn.groupParticipantsUpdate(m.chat, [users], 'remove');
					reply2('successfully removed the user 😎');
				} catch (err) {
					console.error(err);
					reply2('there was an error while kicking, try again');
				}
			};
			break;

case 'promote':
			case 'pm': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!m.isGroup) return reply2(mess.group)
				if (!isCreator && !isAdmins) return reply2(mess.admin)
				if (!isBotAdmins) return reply2(mess.botAdmin)
				if (!m.quoted && !m.mentionedJid[0] && isNaN(parseInt(args[0]))) return reply2('Who do you want to promote? Tag them');
				let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (!m.mentionedJid[0] && !m.quoted && !text) return reply2(`Who do you want to ${command}? 🤔 Tag them`)
				await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply2(mess.done)).catch((err) => reply2(mess.error))
			}
			break

case 'demote':
			case 'dm': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!m.isGroup) return reply2(mess.group)
				if (!isCreator && !isAdmins) return reply2(mess.admin)
				if (!isBotAdmins) return reply2(mess.botAdmin)
				if (!m.quoted && !m.mentionedJid[0] && isNaN(parseInt(args[0]))) return reply2('who do you want to demote? ')
				let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (!m.mentionedJid[0] && !m.quoted && !text) return reply2(`Who do you want to ${command}?`)
				await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply2(mess.done)).catch((err) => reply2(mess.error))
			}
			break

	case 'setppgroup': 
			case 'setppgrup': 
			case 'setppgc': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!m.isGroup) return reply(mess.group)
				if (!isAdmins) return reply(mess.admin)
				if (!isBotAdmins) return reply(mess.botAdmin)
				if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
				if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
				if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
				let media = await conn.downloadAndSaveMediaMessage(quoted)
				await conn.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
				reply2(mess.done)
			}
			break

case 'deleteppgroup': 
			case 'delppgc': 
			case 'deleteppgc': 
			case 'delppgroup': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!m.isGroup) return reply(mess.group);
				if (!isAdmins && !isCreator) return reply(mess.admin);
				if (!isBotAdmins) return reply(mess.botAdmin);
				await conn.removeProfilePicture(m.chat)
        reply2(mess.done)
			}
			break;

case 'setppbot': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
				if (!isCreator) return reply(mess.creator)
				if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
				if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
				if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
				let media = await conn.downloadAndSaveMediaMessage(quoted)
				await conn.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
				reply2(mess.done)
			}
			break;

case 'deleteppbot': 
			case 'delppbot': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!isCreator) return reply(mess.creator);
				await conn.removeProfilePicture(conn.user.id)
				reply2(mess.done)
			}
			break;

case 'setbiobot':{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
				if (!isCreator) return reply(mess.creator);
				if (!text) return reply(`where is the text? \nExample: ${prefix + command} i'm hytam`)
				await conn.updateProfileStatus(text)
				reply2(mess.done)
			}
			break;

case 'setdesc':
			case 'setdesk':
				if (!m.isGroup) return reply(mess.group);
				if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin);
				if (!isBotAdmins) return reply(mess.botAdmin);
				if (!text) return reply('where is the text?')
				await conn.groupUpdateDescription(m.chat, text)
				reply2(mess.done)
			break;

	case 'cleardesc':
			case 'cleardesk':{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!m.isGroup) return reply('This command can only be used in groups.');
				if (!isAdmins && !isGroupOwner && !isCreator) return reply('This command can only be used by admins.');
				try {
					await conn.groupUpdateDescription(m.chat, null);
					reply2('Group description successfully removed.');
				} catch (err) {
					console.error(err);
					reply2('Failed to remove group description.');
				}
			}
			break;

	case 'listpc': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
				if (!isCreator) return reply(mess.creator);
				let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id);
				let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`;
				for (let i of anu) {
					let nama = store.messages[i].array[0].pushName;
					teks += `*Name*: ${nama}\n`;
					teks += `*User*: @${i.split('@')[0]}\n`;
					teks += `*Chat*: https://wa.me/${i.split('@')[0]}\n\n`;
					teks += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
				}
				reply2(teks)
			}
			break;

	case 'getdesk':
			case 'getdesc': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!isPremium) return reply(mess.premium);
				if (!m.isGroup) return reply(mess.group);
				try {
					reply2(groupMetadata.desc)
				} catch (error) {
					console.log(error);
					reply2('Failed while performing action, if you are owner please check console.');
				};
			};
			break

case "addprem": {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!isCreator) return reply2(mess.creator) 
 if (!args[0]) return m.reply(`example ${prefix+command} number or\n${prefix+command} @tag`)
 let arxy = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
 let ceknya = await conn.onWhatsApp(arxy) // Check if the number is registered on WhatsApp 
 if (ceknya.length == 0) return m.reply(`Enter a valid number that is registered on WhatsApp!!!`)
 Premium.push(arxy)
 fs.writeFileSync("./database/premium.json", JSON.stringify(Premium))
 m.reply(`Successfully added to Database`)
}
break

 case "delprem": {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
    if (!isCreator) return reply2(mess.creator) 
    if (!args[0]) return m.reply(`example ${prefix+command} number or\n ${prefix+command} @tag`)
    let vcy = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    let unp = Premium.indexOf(vcy)
    Premium.splice(unp, 1)
    fs.writeFileSync("./database/premium.json", JSON.stringify(Premium))
    m.reply(`Successfully removed Premium from database`)
}
break      
        

case 'saveweb':
case 'web2zip': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 async function saveweb2zip(url, options = {}) {
 if (!url) throw new Error('Url is required')
 url = url.startsWith('https://') ? url : `https://${url}`
 const {
 renameAssets = false,
 saveStructure = false,
 alternativeAlgorithm = false,
 mobileVersion = false
 } = options

 let { data } = await axios.post('https://copier.saveweb2zip.com/api/copySite', {
 url,
 renameAssets,
 saveStructure,
 alternativeAlgorithm,
 mobileVersion
 }, {
 headers: {
 accept: '*/*',
 'content-type': 'application/json',
 origin: 'https://saveweb2zip.com',
 referer: 'https://saveweb2zip.com/',
 'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
 }
 })

 while (true) {
 let { data: process } = await axios.get(`https://copier.saveweb2zip.com/api/getStatus/${data.md5}`, {
 headers: {
 accept: '*/*',
 'content-type': 'application/json',
 origin: 'https://saveweb2zip.com',
 referer: 'https://saveweb2zip.com/',
 'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
 }
 })

 if (!process.isFinished) {
 await new Promise(resolve => setTimeout(resolve, 1000))
 continue
 } else {
 return {
 url,
 error: {
 text: process.errorText,
 code: process.errorCode
 },
 copiedFilesAmount: process.copiedFilesAmount,
 downloadUrl: `https://copier.saveweb2zip.com/api/downloadArchive/${process.md5}`
 }
 }
 }
 }

 try {
 if (!args[0]) return m.reply('Which website to save?\n\nExample : .saveweb https://kimkiro.my.id')

 m.reply('please wait..')

 let result = await saveweb2zip(args[0], { renameAssets: true })

 await conn.sendMessage(m.chat, {
 document: { url: result.downloadUrl },
 fileName: `${args[0]}.zip`,
 mimetype: 'application/zip'
 }, { quoted: m })

 } catch (e) {
 m.reply(e.message)
 }
}
break

case "pushkontak": {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isCreator) return reply2(mess.creator) 
if (!m.isGroup) return reply(mess.group)
if (!text) return m.reply("example: pushkontak hello")
const teks = text
const jidawal = m.chat
const data = await conn.groupMetadata(m.chat)
const halls = await data.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
await m.reply(`Processing push contact to *${halls.length}* group members`)
for (let mem of halls) {
if (mem !== botNumber && mem.split("@")[0] !== global.owner) {
await conn.sendMessage(mem, {text: teks}, {quoted: qkontak })
await sleep(global.delayPushkontak)
}}

await conn.sendMessage(jidawal, {text: `*Push contact successful ✅*\nTotal members messaged: ${halls.length}`}, {quoted: m})
}
break

case 'jpmtag':{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isCreator) return reply2(mess.creator) 
if (!text) return reply(`wrong usage\n${prefix+command} text|delay\n\n1000 = 1 second, 2000 = 2 seconds and so on | supports image`)
await reply2("Please wait, processing")
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
let metadat72 = await conn.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await conn.downloadAndSaveMediaMessage(quoted)
mem = await uploadwidipe(media)
await conn.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
} else {
await conn.sendMessage(xnxx, { text: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
}}
reply2("Jpm Tag Success")
}
break

case 'transfer': {
if (!isRegistered) return reply2(`you are not registered, please register first to use rpg features`)
if (!m.isGroup) return reply(mess.group)
function special(type) {
let b = type.toLowerCase()
let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
return special
}

function isNumber(x) {
return !isNaN(x)
}
const items = [
'money', 'bank', 'potion', 'trash', 'wood',
'rock', 'string', 'petFood', 'emerald',
'diamond', 'gold', 'iron', 'common',
'uncommon', 'mythic', 'legendary', 'pet', 'chip', 
'anggur', 'apel', 'jeruk', 'mangga', 'pisang', 
'bibitanggur', 'bibitapel', 'bibitjeruk', 'bibitmangga', 'bibitpisang',
]
let user = db.data.users[m.sender]
const item = items.filter(v => v in user && typeof user[v] == 'number')
let lol = `Use format ${command} [type] [value] [number]
example ${command} money 9999 @tag

📍 Transferable items
${item.map(v => `${rpg.emoticon(v)}${v}`.trim()).join('\n')}
`.trim()
const type = (args[0] || '').toLowerCase()
if (!item.includes(type)) return reply(lol)
const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
let _user = db.data.users[who]
if (!who) return reply('Tag someone, or type their number!!')
if (!(who in db.data.users)) return reply(`User ${who} not in database`)
if (user[type] * 1 < count) return reply(`Your *${rpg.emoticon(type)}${type}${special(type)}* is less *${count - user[type]}*`)
let previous = user[type] * 1
let _previous = _user[type] * 1
user[type] -= count * 1
_user[type] += count * 1
if (previous > user[type] * 1 && _previous < _user[type] * 1) reply2(`*––––––『 TRANSFER 』––––––*\n*📊 Status:* Success\n*🗂️ Type:* ${type}${special(type)} ${rpg.emoticon(type)}\n*🧮 Count:* ${count}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [who] })
else {
user[type] = previous
_user[type] = _previous
reply2(`*––––––『 TRANSFER 』––––––*\n*📊 Status:* Failed\n*📍 Item:* ${count} ${rpg.emoticon(type)}${type}${special(type)}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [who] })
}
}
break

case 'fighting':
 case 'fight': {
 if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!m.isGroup) return reply(mess.group)
conn.fight = conn.fight ? conn.fight: {}
let user = db.data.users[m.sender]
if (typeof conn.fight[m.sender] != "undefined" && conn.fight[m.sender] == true) return reply2(`You are still fighting.`)
let users = participants.map(a => a.id)
var lawan
lawan = users[Math.floor(users.length * Math.random())]
while (typeof db.data.users[lawan] == "undefined" || lawan == m.sender) {
lawan = users[Math.floor(users.length * Math.random())]
}
reply2(`*You* (level ${user.level}) challenged *${conn.getName(lawan)}* (level ${db.data.users[lawan].level}) and the fight is ongoing.\n\nWait 5 minutes and see who wins.`)
conn.fight[m.sender] = true
await delay(300000)
let kesempatan = []
for (let i = 0; i < user.level; i++) kesempatan.push(m.sender)
for (let i = 0; i < db.data.users[lawan].level; i++) kesempatan.push(lawan)
let pointPemain = 0
let pointLawan = 0
for (let i = 0; i < 10; i++) {
let unggul = getRandom(0, kesempatan.length - 1)
if (kesempatan[unggul] == m.sender) pointPemain += 1
else pointLawan += 1
}
if (pointPemain > pointLawan) {
let hadiah = (pointPemain - pointLawan) * 10000
user.money += hadiah
user.limit += 1
reply2(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*You* (level ${user.level}) won against *${conn.getName(lawan)}* (level ${db.data.users[lawan].level}) because you ${alasanMenang[getRandom(0, alasanMenang.length - 1)]}\n\nPrize . ${hadiah.toLocaleString()}\n+1 Limit`)
} else if (pointPemain < pointLawan) {
let denda = (pointLawan - pointPemain) * 100000
user.money -= denda
user.limit += 1
reply2(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*You* (level ${user.level}) lost to *${conn.getName(lawan)}* (level ${db.data.users[lawan].level}) because you ${alasanKalah[getRandom(0, alasanKalah.length - 1)]}\n\nYour money decreased by ${denda.toLocaleString()}\n+1 Limit`)
} else {
reply2(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\nIt's a tie, nobody gets anything`)
}
delete conn.fight[m.sender]
}
break

case 'videy': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return m.reply(`Enter a videy.co URL!\nExample: .videy <link videy>`)
 try {
 const url = encodeURIComponent(text)
 const res = await fetch(`https://api.nekorinn.my.id/downloader/videy?url=${url}`)
 const json = await res.json()

 if (!json.status || !json.result) return m.reply('Failed to fetch video. Make sure the link is correct.')

 await conn.sendMessage(m.chat, {
 video: { url: json.result },
 caption: `✅ Successfully fetched video from *Videy*\n\n🎥 Link: ${text}`
 }, { quoted: m })

 } catch (e) {
 console.error('Error videy:', e)
 m.reply('An error occurred while fetching the video.')
 }
 }
 break
 
case 'ass':
case 'ahegao':
case 'bdsm':
case 'blowjob':
case 'cuckold':
case 'cum':
case 'eba':
case 'ero':
case 'femdom':
case 'food':
case 'gangbang':
case 'glasses':
case 'jahy':
case 'masturbation':
case 'neko-hentai':
case 'neko-hentai2':
case 'nsfwloli':
case 'orgy':
case 'panties':
case 'pussy':
case 'tentacles':
case 'thighs':
case 'hentai': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
async function scrapeData() {
 try {
const page = Math.floor(Math.random() * 50);
 const { data } = await axios.get('https://e-hentai.org/tag/random?prev=' + page);
 const $ = cheerio.load(data);
 const results = [];
 $('.glthumb').each((index, element) => {
 const img = $(element).find('img');
 const imgSrc = img.attr('data-src');
 
 if (imgSrc) {
 results.push(imgSrc);
 }
 });
 return results
 } catch (error) {
 console.error('Error fetching data:', error);
 }
}
function getRandomElement(array) {
 const randomIndex = Math.floor(Math.random() * array.length);
 return array[randomIndex];
}
const jmebut = await scrapeData()
const randomUrl = getRandomElement(jmebut);
conn.sendMessage(m.chat, { caption: mess.success, image: { url: randomUrl } }, { quoted: m })
 } catch (error) {
 return m.reply(`💥 An error occurred while fetching data: ${error.message}`);
 }
}
break

case 'geserplanet': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply('Example: .geserplanet mars')

 const planet = text.toLowerCase()
 const efek = {
 mars: [
 '🛰️ Mars orbit shifted by 500 km.',
 '🌪️ Martian dust storms disrupt NASA missions.',
 '📉 Surface temperature drops by 20°C due to orbital change.',
 '😨 Opportunity rover loses direction.',
 '⚠️ Global scientists are looking for solutions...'
 ],
 bumi: [
 '🌍 Earth shifted 1000 km away from the Sun.',
 '🌡️ Global temperatures drop drastically, causing a mini ice age.',
 '🌊 Ocean tides become irregular.',
 '🧭 Magnetic poles shift, compasses go crazy.',
 '📡 Communication satellites disconnected for 2 hours.'
 ],
 jupiter: [
 '🪐 Jupiter moved 1500 km outward.',
 '🌪️ Great Red Spot loses rotational balance.',
 '🛰️ Jupiter gravity perturbs its satellites.',
 '🧪 Scientists warn of increased asteroid collision chance.',
 '🛸 Aliens are confused...'
 ]
 }

 const hasil = efek[planet] || [
 `🚀 Planet ${planet} moved 1000 km from its orbit.`,
 '🌌 Local gravity disturbed.',
 '⚠️ Domino effects occur on neighboring planets.',
 '🧑‍🚀 Scientists hold emergency conference.',
 '😅 Luckily this is just a simulation... all safe.'
 ]

 reply(`🔬 Planet Shift Simulation: ${planet.toUpperCase()}\n\n${hasil.join('\n')}\n\n📌 This is a fictional simulation based on scientific theory.`)
}
break

case 'cekhitam': case 'hitamcek': {
 ;
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!q) return reply(`type a name ${command} Name\nExample : ${command} yanto`);
 
 // If name is "yann", return 100% black
 if (q.toLowerCase() === 'yann') {
 m.reply(`Name : ${q}\nAnswer : *100% haha so dark like coal 😂`);
 } else {
 const can = ['10% Haha dark', 
 '30% Keep taking care', 
 '20% Keep your spirit 👍', 
 '40% Wow', 
 '50% Quite dark', 
 '60% Hello Dark', 
 '70% Hello', 
 '62% Dark indeed', 
 '74% Quite dark', 
 '83% Love You', 
 '97% Assalamualaikum', 
 '100% Very dark', 
 '29% Keep the spirit :)', 
 '94% Hello Dark', 
 '75% Hey Dark', 
 '82% Looks like you do regular care?', 
 '41% Keep going :)', 
 '39% More spirit']
 
 const tik = can[Math.floor(Math.random() * can.length)];
 m.reply(`Name : ${q}\nAnswer : *${tik}*`);
 }
 ;
}
break;

case 'yts': 
			case 'ytsearch': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)		
				if (!text) return reply2(`Where is the title?\nExample:\n${prefix + command} baon cikadap`);
				try {
					await conn.sendMessage(from, {react: {text: "🕐", key: m.key}})
					let search = await yts(text);
					if (!search || !search.videos || search.videos.length === 0) {
						return reply2(`Sorry, the keyword was not found try another keyword`);
					}
					let results = search.videos.slice(0, 2);
					for (let i = 0; i < results.length; i++) {
						let video = results[i];
						let caption = `🔢 *No*: ${i + 1}\n`;
						caption += `🎬 *Title*: ${video.title || 'No title'}\n`;
						caption += `👤 *Channel*: ${video.author?.name || 'Unknown'}\n`;
						caption += `👁️ *Views*: ${video.views || 'Unknown'}\n`;
						caption += `⏳ *Duration*: ${video.timestamp || 'Unknown'}\n`;
						caption += `📆 *Uploaded*: ${video.ago || 'Unknown'}\n`;
						caption += `🔗 *Link*: ${video.url || 'No link'}\n`;
						await conn.sendMessage(m.chat, {
							image: { url: video.thumbnail || imageUrl },
							caption: caption,
						}, { 
							quoted: m 
						});
					}
					reply2(`*Successfully displayed 2 YouTube search results ✅`);
				} catch (err) {
					console.error(err);
					reply2(`*An error occurred while searching for videos! \n${err.message || err}`);
				}
			}
			break;
 
case 's':
case 'stiker':
case 'sticker': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!quoted) return reply(`Send/Reply Images/Videos/Gifs With Caption ${prefix+command}\nVideo Duration 1-9 Seconds`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply2('Send/Reply Images/Videos/Gifs With Caption ${prefix+command}\nVideo Duration 1-9 Seconds')
let media = await quoted.download()
let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else {
reply2(`Send/Reply Images/Videos/Gifs With Caption ${prefix+command}\nVideo Duration 1-9 Seconds`)
}
}
break

case "swm":
 case "wm": 
 case "stickerwm": {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!args.join(" ")) return reply2(`*ex:* ${prefix + command} keyuu`)
 const swn = args.join(" ")
 const pcknm = swn.split("|")[0]
 const atnm = swn.split("|")[1]
 if (m.quoted.isAnimated === true) {
 conn.downloadAndSaveMediaMessage(quoted, "gifee")
 conn.sendMessage(m.chat, { 
 sticker: fs.readFileSync("gifee.webp") }, m, {
 packname: pcknm,
 author: atnm
 })
 } else if (/image/.test(mime)) {
 let media = await quoted.download()
 let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
 packname: pcknm,
 author: atnm
 })
 } else if (/video/.test(mime)) {
 if ((quoted.msg || quoted).seconds > 10) return reply('\nduration max 10 seconds\n')
 let media = await quoted.download()
 let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {
 packname: pcknm, 
 author: atnm
 })
 } else {
 reply(`*ex:* reply image/video ${prefix + command}`)
 }
 }
 break

case 'ytmp3': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`Please provide the YouTube link, Example: ${prefix + command} https://youtube.com/watch?v=Xs0Lxif1u9E`);
 const url = text.trim();
 const format = 'mp3';
 const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
 if (!regex.test(url)) {
 return reply('the link you provided is not valid, please provide a correct link.');
 }
 reply('Please wait, processing 😜');
 try {
 const headers = {
 "accept": "*/*",
 "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
 "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
 "sec-ch-ua-mobile": "?1",
 "sec-ch-ua-platform": "\"Android\"",
 "sec-fetch-dest": "empty",
 "sec-fetch-mode": "cors",
 "sec-fetch-site": "cross-site",
 "Referer": "https://id.ytmp3.mobi/",
 "Referrer-Policy": "strict-origin-when-cross-origin"
 }
const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {headers});
let format = 'mp4';
const init = await initial.json();
const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
let convertURL = init.convertURL + `&v=${id}&f=${format}&_=${Math.random()}`;
const converts = await fetch(convertURL, {headers});
const convert = await converts.json();
let info = {};
for (let i = 0; i < 3; i++ ){
 let j = await fetch(convert.progressURL, {headers});
 info = await j.json();
 console.log(info);
 if (info.progress == 3) break;
}
const result = {
 url: convert.downloadURL,
 title: info.title
}
await conn.sendMessage(m.chat, {
 audio: { url: result.url },
 mimetype: 'audio/mp4'
 }, { quoted: m });
} catch {
 reply('oops an error occurred..')
}
}
break

case 'ytmp4': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return m.reply(`Please provide the YouTube link, Example: ${prefix + command} https://youtube.com/watch?v=Xs0Lxif1u9E`);
try {
 const url = text.trim();
const headers = {
 "accept": "*/*",
 "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
 "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
 "sec-ch-ua-mobile": "?1",
 "sec-ch-ua-platform": "\"Android\"",
 "sec-fetch-dest": "empty",
 "sec-fetch-mode": "cors",
 "sec-fetch-site": "cross-site",
 "Referer": "https://id.ytmp3.mobi/",
 "Referrer-Policy": "strict-origin-when-cross-origin"
 }
const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {headers});
let format = 'mp4';
const init = await initial.json();
const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
let convertURL = init.convertURL + `&v=${id}&f=${format}&_=${Math.random()}`;
const converts = await fetch(convertURL, {headers});
const convert = await converts.json();
let info = {};
for (let i = 0; i < 3; i++ ){
 let j = await fetch(convert.progressURL, {headers});
 info = await j.json();
 console.log(info);
 if (info.progress == 3) break;
}
const result = {
 url: convert.downloadURL,
 title: info.title
}
await conn.sendMessage(m.chat, { video: { url: result.url } }, { quoted: m });
} catch {
 reply2('oops an error occurred, please fix it 😜')
}
}
break

case 'nebang': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isGroup) return reply(mess.group)
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return hours + " hours " + minutes + " minutes " + seconds + " seconds"
}
let user = db.data.users[m.sender]
let time = user.lastparming + 1800000
if (new Date - user.lastparming < 1800000) return reply2(`You are too tired to work\nWait for ${msToTime(time - new Date())} more`)
let wood = `${Math.floor(Math.random() * 50)}`.trim()
let money = `${Math.floor(Math.random() * 50000)}`.trim()
user.wood += wood * 1
user.money += money * 1
user.lastparming = new Date * 1
reply2(`Congratulations you received: \n+${wood} Wood\n+${money} Money`)
}
break

case 'claim':
case 'bonus': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isGroup) return reply(mess.group)
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return hours + " hours " + minutes + " minutes " + seconds + " seconds"
}
let user = db.data.users[m.sender]
let time = user.lastbonus + 86400000
if (new Date - user.lastbonus < 86400000) return reply2(`You have already taken today's bonus\nWait for ${msToTime(time - new Date())} more`)
let money = Math.floor(Math.random() * 50000000)
user.money += money * 1
user.lastbonus = new Date * 1
reply2(`Congratulations You Received Bonus: \n+${money} Money`)
}
break

case 'collect': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!isGroup) return reply(mess.group)
function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}
let __timers = (new Date - db.data.users[m.sender].lastclaim)
let _timers = (43200000 - __timers)
let timers = clockString(_timers) 
let user = db.data.users[m.sender]
if (new Date - db.data.users[m.sender].lastclaim > 43200000) {
reply2(`You have claimed and received *1000* 💵money and *1* 🥤potion`)
user.money += 1000
user.potion += 1
user.lastclaim = new Date * 1
} else reply2(`please wait *${timers}* more to claim again`)
}
break

	case 'toimg': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
				if (!quoted) return reply2('Reply Image')
				if (!/webp/.test(mime)) return reply2(`Reply sticker with caption *${prefix + command}*`)
				await conn.sendMessage(from, {react: {text: "✨", key: m.key}})
				let media = await conn.downloadAndSaveMediaMessage(quoted)
				let ran = await getRandom('.png')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) throw err
					let buffer = fs.readFileSync(ran)
					conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
					fs.unlinkSync(ran)
				})
			}
			break;

case 'get':
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!isCreator) return reply(mess.creator)
if (!/^https?:\/\//.test(text)) return reply(`Start the *URL* with http:// or https://\nexample: .get https//`)
const ajg = await fetch(text);
if (ajg.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
throw `Content-Length: ${ajg.headers.get('content-length')}`;
}
const contentType = ajg.headers.get('content-type');
if (contentType.startsWith('image/')) {
conn.sendMessage(m.chat, { image: { url: text } }, 'imageMessage', text, m);
}
if (contentType.startsWith('video/')) {
conn.sendMessage(m.chat, { video: { url: text } }, 'videoMessage', text, m);
}
if (contentType.startsWith('audio/')) {
conn.sendMessage(m.chat, { audio: { url: text } }, 'audioMessage', text, m);
}
let alak = await ajg.buffer();
try {
alak = util.format(JSON.parse(alak + ''));
} catch (e) {
alak = alak + '';
} finally {
reply(alak.slice(0, 65536));
}
break

case 'spotify': case 'spotifydl': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`Send Spotify link!\nExample: *.${command} https://open.spotify.com/track/3k68kVFWTTBP0Jb4LOzCax*`);

 try {
 reply('Please wait, processing');
 let apiUrl = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(text)}`;
 let { data } = await axios.get(apiUrl);

 if (data.status !== 200 || !data.result || !data.result.status) 
 return reply('Failed to fetch data from Spotify.');

 let { title, music } = data.result;

 let audioBuffer = await axios.get(music, { responseType: 'arraybuffer' })
 .then(res => res.data)
 .catch(err => {
 console.error('Error fetching audio:', err);
 return null;
 });

 if (!audioBuffer) return reply('Failed to download audio.');

 await conn.sendMessage(m.chat, { 
 audio: audioBuffer, 
 mimetype: 'audio/mpeg', 
 fileName: `${title}.mp3` 
 }, { quoted: m });

 } catch (err) {
 console.error('Main error:', err);
 reply('An error occurred, try again later.');
 }
 break;
}

case 'gdrive': case 'googledrive': case 'drive':{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`Send Google Drive link!\nExample: *.${command} https://drive.google.com/*`);

 try {
 reply('Please wait, processing.');
 let apiUrl = `https://apii.baguss.web.id/downloader/gdrivedl?apikey=bagus&url=${encodeURIComponent(text)}`;
 let { data } = await axios.get(apiUrl);

 if (!data.success) return reply('Failed to fetch data from Google Drive.');

 let { name, download_url } = data.file;

 let fileBuffer = await getBuffer(download_url);

 conn.sendMessage(m.chat, { document: fileBuffer, fileName: name, mimetype: 'application/octet-stream' }, { quoted: m });

 } catch (err) {
 console.error(err);
 reply('An error occurred, try again later.');
 }
 break;
}

case 'fbdl': case 'fb': case 'facebook': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`Send Facebook link!\nExample: *.${command} https://www.facebook.com/watch?v=123456789*`);

 try {
 reply('⏳ Processing, please wait');
 const axios = require('axios');

 let apiUrl = `https://api.vreden.my.id/api/fbdl?url=${encodeURIComponent(text)}`;
 let { data } = await axios.get(apiUrl);

 if (data.status !== 200 || !data.data.status) return reply('Failed to fetch data from Facebook.');

 let { title, durasi, hd_url, sd_url } = data.data;
 
 let captionText = `🎬 *Title:* ${title}\n⏳ *Duration:* ${durasi}\n🔗 *Link:* ${text}`;

 async function sendVideo(url) {
 try {
 let media = { video: { url }, caption: captionText };
 await conn.sendMessage(m.chat, media, { quoted: m });
 } catch (err) {
 console.error(err);
 reply('Failed to send video.');
 }
 }

 if (hd_url) {
 await sendVideo(hd_url);
 } else if (sd_url) {
 await sendVideo(sd_url);
 } else {
 reply('Failed to download video! No available format.');
 }

 } catch (err) {
 console.error(err);
 reply('An error occurred, try again later.');
 }
 break;

}

case 'tiktokaudio':
case 'tiktokmp3':
case 'ttmp3': {
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`Enter a TikTok URL!\n\nExample: .${command} https://vt.tiktok.com/ZS29uaYEv/`);

 try {
 reply('⏳ Processing...');
 let apiUrl = `https://api.vreden.my.id/api/tiktok?url=${encodeURIComponent(text)}`;

 let res = await fetch(apiUrl);
 let json = await res.json();

 console.log("API JSON Response:", json); 

 if (!json.status || !json.result || !json.result.music_info) {
 return reply('Failed to fetch audio. Ensure the TikTok link is valid!');
 }

 let data = json.result.music_info;

 let caption = `*「 TikTok MP3 」*\n\n` +
 `🎶 *Title*: ${data.title}\n` +
 `🎤 *Artist*: ${data.author}\n` +
 `📀 *Album*: ${data.album}\n` +
 `🔗 *Video Link*: ${text}`;

 let audioBuffer = await getBuffer(data.url);

 await conn.sendMessage(m.chat, { 
 audio: audioBuffer, 
 mimetype: 'audio/mpeg', 
 fileName: `${data.title || 'tiktok_audio'}.mp3` 
 }, { quoted: m });

 } catch (e) {
 console.error("Error TikTok MP3:", e);
 reply('An error occurred while fetching data.');
 }
 break;
}

case 'instagram2': case 'ig2': case 'igdl2':{
if (!isRegistered) return daftar(`you are not registered, register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return reply(`Send Instagram link!\nExample: *.${command} https://www.instagram.com/reel/DDqZnIYPsRX/*`);

 try {
 reply('⏳ Processing...');
 let apiUrl = `https://apii.baguss.web.id/downloader/igdl?apikey=bagus&url=${text}`;
 let { data } = await axios.get(apiUrl);

 if (!data.success) return reply('Failed to fetch data from Instagram.');

 let { video, detail } = data;
 let captionText = `📌 *Username:* @${detail.username}\n❤️ *Likes:* ${detail.like}\n💬 *Comments:* ${detail.comment}\n👀 *Views:* ${detail.view || 'Not available'}\n\n🔗 *Link:* ${text}\n\n📝 *Caption:*\n${detail.title || 'No caption'}`;

 if (video?.url) {
 let media = await getBuffer(video.url);
 conn.sendMessage(m.chat, { video: media, caption: captionText }, { quoted: m });
 } else {
 reply('No downloadable video available.');
 }

 } catch (err) {
 console.error(err);
 reply('An error occurred, try again later.');
 }
}
 break;

case "tts": { 
if (!isRegistered) return daftar(`you haven't registered, please register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
 if (!text) return m?.reply(`${prefix}${command} hello world`);
 const a = await (
 await axios.post(
 "https://gesserit.co/api/tiktok-tts",
 { text: text, voice: "id_001" },
 {
 headers: {
 Referer: "https://gesserit.co/tiktok",
 "User-Agent":
 "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
 responseType: "arraybuffer",
 },
 },
 )
 ).data;
 const b = Buffer.from(a.audioUrl);
 conn.sendMessage(m?.chat, {
 audio: Buffer.from(a.audioUrl.split("base64,")[1], "base64"),
 mimetype: "audio/mpeg",
 });
 }
 break;


case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": case "6gb": case "7gb": case "8gb": case "9gbb": case "10gb": {
 if (!isCreator && !isPremium ) return reply(mess.premium)
if (global.apikey.length < 1) return reply("API key not found!")
if (!args[0]) return reply(example("name,6283XXX"))
if (!text.split(",")) return reply(example("name,6283XXX"))
var buyyer = text.split(",")[0].toLowerCase()
if (!buyyer) return reply(example("name,6283XXX"))
var ceknya = text.split(",")[1]
if (!ceknya) return reply(example("name,6283XXX"))
var client = text.split(",")[1].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
var check = await conn.onWhatsApp(ceknya)
if (!check[0].exists) return reply("Buyer number is not valid!")
global.panel2 = [buyyer, client]
var ram
var disknya
var cpu
if (command == "1gb") {
ram = "1125"
disknya = "1125"
cpu = "40"
} else if (command == "2gb") {
ram = "2125"
disknya = "2125"
cpu = "60"
} else if (command == "3gb") {
ram = "3125"
disknya = "3125"
cpu = "80"
} else if (command == "4gb") {
ram = "4125"
disknya = "4125"
cpu = "100"
} else if (command == "5gb") {
ram = "5125"
disknya = "5125"
cpu = "120"
} else if (command == "6gb") {
ram = "6125"
disknya = "6125"
cpu = "140"
} else if (command == "7gb") {
ram = "7125"
disknya = "7125"
cpu = "160"
} else if (command == "8gb") {
ram = "8125"
disknya = "8125"
cpu = "180"
} else if (command == "9gb") {
ram = "9124"
disknya = "9125"
cpu = "200"
} else if (command == "10gb") {
ram = "10125"
disknya = "10125"
cpu = "220"
}
let username = global.panel2[0].toLowerCase()
let email = username+"@gmail.com"
let name = username
let password = username + crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
await reply(`*Successfully Created Panel Account ✅*

* *User ID :* ${user.id}
* *Server ID :* ${server.id}
* *Name :* ${name} Server
* *Ram :* ${ram == "10125" ? "10Gb" : ram.charAt(0) + "GB"}
* *CPU :* ${cpu == "220" ? "220%" : cpu+"%"}
* *Storage :* ${disknya == "10125" ? "10Gb" : disknya.charAt(0) + "GB"}
* *Created :* ${desc}
Account data has been sent to number ${global.panel2[1].split('@')[0]}`)
var teks = `_Here's the Panel Package_ 📦
* *👤Username :* ${user.username}
* *🔐Password :* ${password.toString()}
* *🔗Login Link :* ${global.domain}

_*NOTE!!*_
> *Seller only provides data once, lost? Your fault*
> *To claim warranty, screenshot the transaction is required*
> *7-day warranty*
> *Do not run/use DDoS-related scripts*
> *Hope you subscribe*
`
conn.sendMessage(global.panel2[1],{text: teks }, { quoted: qkontak })
}
break;

case "listserver": case "listsrv": {
 if (!isCreator) return reply(mess.creator) 
 let page = args[0] ? args[0] : '1';
 let f = await fetch(domain + "/api/application/servers?page=" + page, {
 "method": "GET",
 "headers": {
 "Accept": "application/json",
 "Content-Type": "application/json",
 "Authorization": "Bearer " + apikey
 }
 });
 let res = await f.json();
 let servers = res.data;
 let sections = [];
 let messageText = "\n*乂 Pterodactyl Panel Server List 乂*\n\n";
 
 for (let server of servers) {
 let s = server.attributes;
 
 let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
 "method": "GET",
 "headers": {
 "Accept": "application/json",
 "Content-Type": "application/json",
 "Authorization": "Bearer " + capikey
 }
 });
 
 let data = await f3.json();
 let status = data.attributes ? data.attributes.current_state : s.status;
 
 messageText += `- Server ID: *${s.id}*\n`;
 messageText += `- Server Name: *${s.name}*\n`;
 messageText += `- Status: *${status}*\n`;
 messageText += `- Ram : *${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}*
- CPU : *${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}*
- Disk : *${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}*
- Created : ${s.created_at.split("T")[0]}\n\n`
 }
 
 messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
 messageText += `Total Server: ${res.meta.pagination.count}`;
 
 await conn.sendMessage(m.chat, { text: messageText }, { quoted: qkontak });
 
 if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
 reply(`Use the command ${prefix}listsrv ${res.meta.pagination.current_page + 1} to view the next page.`);
 } 
}
break;

case "delsrv": case "delserver": {
 if (!isCreator) return reply(mess.creator) 
let srv = args[0]
if (!srv) return reply('Where is the ID?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply("_`Successfully Deleted Server`_✅")
}
 break

case "listuser": case "listusr": {
if (!isCreator) return reply(mess.creator) 
 let page = args[0] ? args[0] : '1';
 let f = await fetch(domain + "/api/application/users?page=" + page, {
 "method": "GET",
 "headers": {
 "Accept": "application/json",
 "Content-Type": "application/json",
 "Authorization": "Bearer " + apikey
 }
 });
 let res = await f.json();
 let users = res.data;
 let messageText = "\n*Pterodactyl Panel User List*\n\n";
 
 for (let user of users) {
 let u = user.attributes;
 messageText += `- ID: *${u.id}* 
- Status: *${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}*\n`;
 messageText += `- *${u.username}*\n`;
 messageText += `- *${u.first_name} ${u.last_name}*\n\n`;
 }
 
 messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
 messageText += `Total Users: ${res.meta.pagination.count}`;
 
 await conn.sendMessage(m.chat, { text: messageText }, { quoted: qkontak });
 
 if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
 reply(`Use the command ${prefix}listusr ${res.meta.pagination.current_page + 1} to view the next page.`);
 }
}
break;

case "deluser": {
if (!isCreator) return reply(mess.creator) 
let usr = args[0]
if (!usr) return reply('Where is the ID?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply("_`Successfully Deleted User`_ ✅")
} 
break

case "listadmin": {
if (!isCreator) return reply(mess.creator) 
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return reply("No panel admins found")
var teks = " *乂 Pterodactyl Panel Admin List 乂*\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += `\n* ID : *${i.attributes.id}*
* Name : *${i.attributes.first_name}*
* Created : ${i.attributes.created_at.split("T")[0]}\n`
})
await conn.sendMessage(m.chat, { text: teks }, { quoted: qkontak });
}
break

case "deladmin": {
if (!isCreator) return reply(mess.creator) 
if (!args[0]) return reply("Where is the ID?") 
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return reply("Panel admin account not found!")
reply("_`Successfully Deleted Admin User`_ ✅")
}
break

case "cadmin": {
if (!isCreator) return reply(mess.creator) 
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Wrong format!*\nUsage:\n${prefix + command} user,number`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/number\n\nExample :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/number\n\nExample :\n${prefix+command} example,@user`)
if (!text.split(",")) return reply(example("name,6283XXX"))
var buyyer = text.split(",")[0].toLowerCase()
if (!buyyer) return reply(example("name,6283XXX"))
var ceknya = text.split(",")[1]
if (!ceknya) return reply(example("name,6283XXX"))
var client = text.split(",")[1].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
var check = await Lexzy.onWhatsApp(ceknya)
if (!check[0].exists) return reply("Buyer number is not valid!")
global.panel2 = [buyyer, client]
let password = username + crypto.randomBytes(2).toString('hex')
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Admin",
"language": "en",
 "root_admin" : true, 
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: USER

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
CREATED AT: ${user.created_at}
`
 const listMessage = {
 text: tks,
 }
 await conn.sendMessage(m.chat, listMessage)
var teks = `Here's the Admin Panel Package 📦
* *👤Username :* ${user.username}
* *🔐Password :* ${password.toString()}
* *🔗Login Link :* ${global.domain} 

*Guide to create panel :* https://files.catbox.moe/91ig9h.mp4
*Guide to install sc bot cpanel :* https://files.catbox.moe/d7l684.mp4

*Note !!*
> Do not share free panel
> Do not distribute panel data
> Do not share panel links
> Do not create admin panel accounts
> Do not run scripts related to DDoS
> *Data is sent only once. Lost? Your fault*
> *7 day warranty*
`
conn.sendMessage(global.panel2[1],{text: teks }, { quoted: qkontak })
}

break;

case "unli": {
 if (!isCreator && isPremium ) return reply("Sorry you are not registered as premium to access the panel")
if (global.apikey.length < 1) return reply("API key not found!")
if (!args[0]) return reply(example("name,6283XXX"))
if (!text.split(",")) return reply(example("name,6283XXX"))
var buyyer = text.split(",")[0].toLowerCase()
if (!buyyer) return reply(example("name,6283XXX"))
var ceknya = text.split(",")[1]
if (!ceknya) return reply(example("name,6283XXX"))
var client = text.split(",")[1].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
var check = await Lexzy.onWhatsApp(ceknya)
if (!check[0].exists) return reply("Buyer number is not valid!")
global.panel2 = [buyyer, client]
var ram
var disknya
var cpu
ram = "0"
disknya = "0"
cpu = "0"
let username = global.panel2[0].toLowerCase()
let email = username+"@gmail.com"
let name = username
let password = username + crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
await reply(`*Successfully Created Panel Account ✅*

* *User ID :* ${user.id}
* *Server ID :* ${server.id}
* *Name :* ${name} Server
* *Ram :* ${ram == "0" ? "UNLIMITED" : ram.charAt(0) + "GB"}
* *CPU :* ${cpu == "0" ? "UNLIMITED" : cpu+"%"}
* *Storage :* ${disknya == "0" ? "UNLIMITED" : disknya.charAt(0) + "GB"}
* *Created :* ${desc}
Account data has been sent to number ${global.panel2[1].split('@')[0]}`)
var teks = `_Here's the Panel Package_ 📦
* *👤Username :* ${user.username}
* *🔐Password :* ${password.toString()}
* *🔗Login Link :* ${global.domain}

_*NOTE!!*_
> *Seller only provides data once, lost? Your fault*
> *To claim warranty, screenshot the transaction is required*
> *7-day warranty*
> *Do not run/use DDoS-related scripts*
> *Hope you subscribe 🥰*
`
conn.sendMessage(global.panel2[1],{text: teks }, { quoted: qkontak })
}
break;

case "pin": case "pinterest": {
if (!text) return m.reply('example:\n.pin ouka shiunji')
await conn.sendMessage(m.chat, {react: {text: '🕐', key: m.key}})
let pin = await pinterest2(text)
if (pin.length > 49) await pin.splice(0, 50)
const txts = text
let araara = new Array()
let urutan = 0
for (let a of pin) {
let imgsc = await prepareWAMessageMedia({ image: {url: `${a.images_url}`}}, { upload: conn.waUploadToServer })
await araara.push({
header: proto.Message.InteractiveMessage.Header.fromObject({
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.images_url}\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
})
}
const msgii = await generateWAMessageFromContent(m.chat, {
viewOnceMessageV2Extension: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `\nHere are photos from the *Pinterest* search`
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: araara
})
})}
}}, {userJid: m.sender, quoted: m})
await conn.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
await conn.sendMessage(m.chat, {react: {text: '', key: m.key}})
}
break


case 'mediafire':
case 'mf': {
 try {
 const mime = require('mime-types');
const cheerio = require('cheerio');
 // Simple reply without m.reply
 if (!text) return reply('Usage example:\n.mf https://www.mediafire.com/file/abc123/file.zip/file');

 if (!text.includes('mediafire.com')) {
 return m.reply('Link must be from MediaFire!\nExample: .mf https://www.mediafire.com/file/abc123/file.zip/file');
 }

 await conn.sendMessage(m.chat, { react: { text: "⏱️",key: m.key,}}) 

 const { data } = await axios.get('https://api.nekorinn.my.id/tools/rynn-stuff-v2', {
 params: {
 method: 'GET',
 url: text.trim(),
 accessKey: '3ebcf782818cfa0b7265086f112ae25c0954afec762aa05a2eac66580c7cb353'
 },
 timeout: 10000
 });

 const $ = cheerio.load(data.result.response);
 const filename = $('.dl-btn-label').attr('title') || 'unknown';
 const mimetype = mime.lookup(filename.split('.').pop()) || 'application/octet-stream';
 const filesize = $('div.dl-info ul.details li:nth-child(1) span').text().trim() || 'Unknown';
 const downloadUrl = Buffer.from($('a#downloadButton').attr('data-scrambled-url'), 'base64').toString();

 await conn.sendMessage(m.chat, {
 document: { url: downloadUrl },
 fileName: filename,
 mimetype: mimetype,
 caption: `*MediaFire Download*\nName: ${filename}\nSize: ${filesize}\nType: ${mimetype}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇʀʀɪ`
 }, { quoted: m });

 await conn.sendMessage(m.chat, { react: { text: "✅",key: m.key,}}) 

 } catch (e) {
 console.error(e);
 m.reply('❌ Failed: ' + (e.message.includes('timeout') ? 'Timeout' : 'Invalid link'));
 }
}
 break

case 'h':
 case 'hidetag':
 case 'ht': {
 if (!m.isGroup) return reply(mess.group)
 if (!isAdmins) return reply('Admins only bro😈')
 if (!isBotAdmins) return reply('Bot must be admin woah😂')

 // Mode 1: No text (only tag everyone)
 if (!q && args.length === 0) {
 conn.sendMessage(
 m.chat, {
 text: ' ', // Space to trigger mentions
 mentions: (await conn.groupMetadata(m.chat)).participants.map(a => a.id)
 }, {
 quoted: m
 }
 )
 }
 // Mode 2: Reply message (use the replied text)
 else if (q) {
 conn.sendMessage(
 m.chat, {
 text: q,
 mentions: (await conn.groupMetadata(m.chat)).participants.map(a => a.id)
 }, {
 quoted: m
 }
 )
 }
 // Mode 3: Add text (use args)
 else {
 conn.sendMessage(
 m.chat, {
 text: args.join(' '),
 mentions: (await conn.groupMetadata(m.chat)).participants.map(a => a.id)
 }, {
 quoted: m
 }
 )
 }

 break
 }

case 'totag': {
 if (!m.isGroup) return reply(mess.group)
 if (!isAdmins && !isCreator) return reply2('Admins only!!')
 if (!isBotAdmins) return reply2('Please make the bot an admin first')
 if (!m.quoted) return reply2(`Reply message with caption ${prefix + command}`)
 conn.sendMessage(m.chat, {
 forward: m.quoted.fakeObj,
 mentions: participants.map(a => a.id)
 })
 }
 break

case 'iqc': {
 try {
 // Ensure text is provided
 if (!text) {
 reply2('Wrong format! Use: .iqc time|battery|message\nExample: .iqc 18:00|40|hello hello Terri');
 break;
 }

 // Split parameters
 const parts = text.split('|');
 if (parts.length < 3) {
 reply2('Wrong format! Use:\n.iqc time|battery|message\nExample:\n.iqc 18:00|40|hello hello');
 break;
 }

 const [time, battery, ...messageParts] = parts;
 const message = messageParts.join('|').trim();

 // Validate input
 if (!time || !battery || !message) {
 reply2('Incomplete format! Make sure to fill time, battery, and message');
 break;
 }

 // Send processing indicator
 await conn.sendMessage(m.chat, {
 react: {
 text: '⏳',
 key: m.key
 }
 });

 // Encode URL parameters
 const encodedTime = encodeURIComponent(time);
 const encodedMessage = encodeURIComponent(message);
 const url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodedTime}&batteryPercentage=${battery}&carrierName=INDOSAT&messageText=${encodedMessage}&emojiStyle=apple`;

 // Fetch image
 const axios = require('axios');
 const response = await axios.get(url, {
 responseType: 'arraybuffer'
 });

 if (!response.data) {
 throw new Error('Failed to get image from server');
 }

 // Send result
 await conn.sendMessage(m.chat, {
 image: Buffer.from(response.data),
 caption: '✅ iPhone quote message created successfully'
 }, {
 quoted: m
 });

 // Mark done
 await conn.sendMessage(m.chat, {
 react: {
 text: '✅',
 key: m.key
 }
 });

 } catch (error) {
 console.error('Error in iqc:', error);
 reply2(`❌ Error: ${error.message || 'An error occurred while processing'}`);
 }
 break;
 }

case 'addcase': {
 if (!isCreator) return reply(mess.creator)
 if (!text) return reply('Where is the case?');
    const fs = require('fs');
const namaFile = 'case.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
    if (err) {
        console.error('An error occurred while reading the file:', err);
        return;
    }
    const posisiAwalGimage = data.indexOf("case 'addcase':");

    if (posisiAwalGimage !== -1) {
        const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
        fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
            if (err) {
                reply('An error occurred while writing the file:', err);
            } else {
                reply('Successfully added feature above Addcase✨');
            }
        });
    } else {
        reply('Cannot add case in the file.');
    }
});

}
break

case 'ping': {
    if (!isRegistered) return daftar(`you haven't registered, please register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
    const initialMessage = await reply("pong")
    const os = require('os') 
    const start = performance.now();
    const speed = (performance.now() - start).toFixed(3);
    await initialMessage.edit(`Anonymous speed ${speed}`)
}
break

case 'helper': {
if (!isRegistered) return daftar(`you haven't registered, please register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
let peler = `\`congratulations to those who have helped me to develop this script\`
===================
> terri [ developer ]
> YannRzy [ Support & Bestie & Base]
====================
> without him, this script is nothing :)`
 conn.sendMessage(m.chat, { 
 text: peler,
 contextInfo: {
 mentionedJid: [m.sender],
 isForwarded: true,
 externalAdReply: {
 showAdAttribution: false,
 renderLargerThumbnail: true,
 title: `ギ special, for thanks`,
 body: `A simple WhatsApp bot uses JavaScript to respond to commands automatically.`,
 mediaType: 1,
 thumbnailUrl: `https://files.catbox.moe/grrlvm.jpg`, 
 thumbnail: ``,
 sourceUrl: `https://www.youtube.com/@Terrizev`
 }
 }
 }, { quoted: m });
 };
 break;

case 'tagall':{
if (!isRegistered) return daftar(`you haven't registered, please register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!m.isGroup) return reply(mess.group)
if (!isCreator) return reply2(mess.creator)
const textMessage = args.join(" ") || "nothing";
let teks = `tagall message :\n> *${textMessage}*\n\n`;
const groupMetadata = await conn.groupMetadata(m.chat);
const participants = groupMetadata.participants;
for (let mem of participants) {
teks += `@${mem.id.split("@")[0]}\n`;
}
conn.sendMessage(m.chat, {
text: teks,
mentions: participants.map((a) => a.id)
}, { quoted: m });
}
break

case 'checkid': case 'idch': {
if (!isRegistered) return daftar(`you haven't registered, please register to use bot features\nhow to register .daftar name.age\nlike this Terri.15`)
if (!text) return reply("the link?")
if (!text.includes("https://whatsapp.com/channel/")) return reply("Invalid link")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await conn.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Name :* ${res.name}
* *Total Followers :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇʀʀɪ
`
return reply(teks)
}
break

// ───────────────────────────────────────────────────────────────────────────────乂 🥀 BATAS CASE ───────────────────────────────────────────────────────────────乂 \\
    default:
    
if (budy.startsWith('=>')) {
    if (!isCreator) return

    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}

if (budy.startsWith('>')) {
    if (!isCreator) return;
    try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        m.reply(String(err));
    }
}

if (budy.startsWith('$')) {
    if (!isCreator) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}

}
} catch (err) {
    console.log(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
