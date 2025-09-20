let handler = async (m, { reply, usedPrefix }) => {
	reply(`${pickRandom(global.heker)}`)
}
handler.help = ['quoteshacker']
handler.tags = ['quotes']
handler.command = ['quoteshacker']
module.exports = handler;

function pickRandom(list) {
 return list[Math.floor(list.length * Math.random())]
}

global.heker = [
  "Dear you who are written on my defacement page, When will you be my girlfriend?",
  "I'm willing to be a Processor that overheats, as long as you're the heatsink that can cool me down at any time.",
  "No need to look for XSS vulnerabilities, because when you click on my heart, your name already pops up.",
  "Hoping that after I successfully log into your heart, there won't be a logout button, and my session will never expire.",
  "Do I have to use symlink bypass techniques to browse through your heart's folder that has open_basedir enabled.",
  "You and I are like PHP and MySQL that haven't been connected yet.",
  "Don't just be able to inject her heart, but also be able to patch it. So she won't cheat with other hackers.",
  "I may be a PHP programmer, but I won't PHP you (play with your feelings).",
  "Eneeeng. | Apache? | You're the most Unix woman I've ever known |",
  "Honey, is your caps lock on? | no, why? | because your name is written so big in my heart | zzz! smile",
  "I'm getting close to you just to redirect to your friend's heart.",
  "Even domains can be parked, can't my love park in your heart?",
  "Can I be your boyfriend? | 400(Bad Request) | Can I kiss you? | 401(Authorization Required) | Let me take off your clothes | 402(Payment Required) sad",
  "Do you know the difference between you and PHP syntax? PHP syntax is hard to memorize, while you're hard to forget",
  "What vocational high school did you go to? | Computer Network Engineering | So what can you do now? | Catch your heart through my computer | biggrin",
  "If love is an Array, then my love for you will never be empty even if unset().",
  "SQLI (Structured Query Love Injection)",
  "I want you to rm -rf all your exes in your mind, I'm the root of your heart",
  "Your smile is like a cooler that cools my heart when it's overclocking.",
  "You are my terminal, where I spend my time typing thousands of lines of love code for you smile",
  "I like hanging out in zone-h, because that's where I archive several websites that have your photos.",
  "My heart is like a VPS only for you, not shared hosting that can stack various domains of love.",
  "I'm not a VNC Server Without Authentication that you can monitor anytime.",
  "Don't dual-boot my heart to you.",
  "I will Ctrl+A my love, then Ctrl+C and Ctrl+V it right into your heart's system folder.",
  "KDE loses in beauty, GNOME loses in simplicity, FluxBox loses in lightness, basically all DEs Lose Compared to You.",
  "Your love is like TeamViewer that always controls my heart",
  "our love cannot be separated no matter how thick the firewall is...!!"
]