let handler = async (m, { reply, usedPrefix }) => {
	reply(`${pickRandom(global.bacot)}`)
}
handler.help = ['quotesbacot']
handler.tags = ['quotes']
handler.command = ['quotesbacot']

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.bacot = [
'Do you like coffee? I do. Know why? Coffee is like you, bitter but addictive so I keep wanting more.',
'Payday is like an ex, right? It only passes by briefly.',
'According to the Hajj pilgrim, men who don\'t want to go to Friday prayers should just wear skirts.',
'Do you know what an ex is? An ex is like payday, usually just passing through our lives.',
'I like you, you like him, but he doesn\'t love you back. Haha funny right? Love is this complicated.',
'Google is amazing right? But unfortunately, no matter how amazing Google is, it can\'t find our soulmates.',
'Too often holding eyebrow pencils can make you blind, if you poke them into your eyes.',
'I work hard because I realize money doesn\'t have legs to walk into my pocket by itself.',
'If you can\'t convince and dazzle people with your intelligence, confuse them with your stupidity.',
'As tiring as work is, being unemployed is even more exhausting.',
'We live in times where if we\'re wrong we get scolded, if we\'re right people say "since when?".',
'No boyfriend\'s shoulder? Don\'t worry, there\'s still the roadside shoulder to lean on.',
'Loving yourself is normal, what\'s not normal is loving your dad.',
'They say eyes can\'t lie. Well of course, eyes can only see.',
'Honey in your right hand, poison in your left hand, but destiny remains in God\'s hands.',
'Cheating doesn\'t happen because of intention, cheating happens because your partner is still desirable.',
'Netizens don\'t cool down their thumbs when exercising on phones, no wonder their comments keep heating things up.',
'Destiny might not go anywhere, but competitors are everywhere.',
'I always feel wrong in your eyes. If that\'s the case, I\'ll move to your nose tomorrow.',
'Don\'t be ashamed of being single, being single doesn\'t mean no one wants you, it just means nobody wants you yet.',
'If your prayers haven\'t been answered yet, be patient, remember you\'re not the only one praying!',
'Still hoping and continuing to hope, eventually I\'ll become the hope champion.',
'Humans can make plans, but in the end, it\'s the balance that decides.',
'Spiritual status, but mischievous behavior.',
'Failure is not a success.',
'Earlier I wanted to eat meatballs, but they were too hot, looks like the meatballs had a fever.',
'I was also rich once, when it was payday.',
'My girlfriend broke up with me because we had different beliefs. I believe I\'m handsome, but she doesn\'t.',
'Your future depends on your dreams, so sleep more.',
'No matter how heavy your work is, it becomes lighter if you don\'t carry it.',
'Don\'t hope too much! It will hurt when you fall!',
'Remember! You are single',
'Don\'t know what to type',
]