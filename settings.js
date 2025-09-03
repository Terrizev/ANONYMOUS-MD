/* PLEASE READ FIRST BRO

BASE: YANNRZY
DEVELOPER: TERRI
BOT NAME: ANONYMOUS-MD 
VERSION: 5.0.0 
UPDATE INFO: https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y
CREDITS @terri 
RESPECT THE DEVELOPER TO KEEP UPDATES COMING
*/
const fs = require('fs')
const chalk = require('chalk')

//SETTINGS OWNER\\
global.ownernumber = "256754550399"
global.ownername = "TERRI"
global.fother = "Aɴᴏɴʏᴍᴏᴜs ᴍᴅ multi device ʙᴏᴛ"

//SETTINGS BOT\\
global.namabot = "ANONYMOUS MD"
global.baileys = "@whiskeysocket/baileys"
global.botNumber = "256754550399"
global.version = "5.0.0"
global.packname = "Created By ᴛᴇʀʀɪ"
global.botname = "ᴀɴᴏɴʏᴍᴏᴜs multi device ʙᴏᴛ"
global.author = "Tᴇʀʀɪ"
global.foother = "Powered By Tᴇʀʀɪ"

//SETTINGS MEDIA \\
global.website = "https://youtube.com/@Terrizev"
global.thumbnail = "https://files.catbox.moe/91n3vx.jpg"
global.yt = "https://youtube.com/@Terrizev"

//SETTING PUSHKONTAK\\
global.NoPushkontak = "+256 754 550399"
global.delayJpm = 7000
global.delayPushkontak = 7000 

//SETTING LIMIT\\
global.limitawal = {
    premium: "Infinity",
    free: 30
}
//SETTINGS CPANEL\\
global.egg = "15"
global.loc = "1"
global.domain = "" // DOMAIN
global.apikey = "" // PTLA
global.capikey = "" // PTLC

//SETTINGS MESSAGE\\
global.mess = {
    error: 'Oops bro, there\'s an error issue here',
    done: 'Doneee bro',
    success: 'Successful bro',
    admin: 'Admins Only Bro, What are you doing? 🧐🤨',
    botAdmin: 'The Bot Isn\'t an Admin Yet, LOL 😂🤭',
    creator: 'Hey, what are you doing?\nThis feature is for the Owner only, LOL 😂🤭',
    owner: 'Only for the owner, bro',
    group: 'This feature is for Groups Only 🤭',
    private: 'Only for Private Chat with the Bot 🤭',
    wait: 'Hold on bro, we\'re processing it first',
    premium: 'Hey, what are you doing? 🤨\nThis is for Premium Members only, LOL',
    endLimit: 'Poor thing, your limit has run out 🤭\nCome back tomorrow to get your limit again 💝'
}

global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
level: '📊',
limit: '🎫',
health: '❤️',
exp: '✨',
atm: '💳',
money: '💰',
bank: '🏦',
potion: '🥤',
diamond: '💎',
common: '📦',
uncommon: '🛍️',
mythic: '🎁',
legendary: '🗃️',
superior: '💼',
pet: '🔖',
trash: '🗑',
armor: '🥼',
sword: '⚔️',
pickaxe: '⛏️',
fishingrod: '🎣',
wood: '🪵',
rock: '🪨',
string: '🕸️',
horse: '🐴',
cat: '🐱',
dog: '🐶',
fox: '🦊',
robo: '🤖',
petfood: '🍖',
iron: '⛓️',
gold: '🪙',
emerald: '❇️',
upgrader: '🧰',
bibitanggur: '🌱',
bibitjeruk: '🌿',
bibitapel: '☘️',
bibitmangga: '🍀',
bibitpisang: '🌴',
anggur: '🍇',
jeruk: '🍊',
apel: '🍎',
mangga: '🥭',
pisang: '🍌',
botol: '🍾',
kardus: '📦',
kaleng: '🏮',
plastik: '📜',
gelas: '🧋',
chip: '♋',
umpan: '🪱',
skata: '🧩'
}
let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}
}

module.exports = {
    SESSION_MAX_AGE: 1800000,
    CLEAN_INTERVAL: 120000
};

global.closeMsgInterval = 30; 
global.backMsgInterval = 2; 
