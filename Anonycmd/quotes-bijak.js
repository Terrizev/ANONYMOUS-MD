let handler = async (m, { reply }) => {
  reply(`"${pickRandom(quotes)}"`, m)
}
handler.help = ['quoteskatabijak']
handler.tags = ['quotes']
handler.command = ['quoteskatabijak']

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const quotes = [
"Belief is a knowledge in the heart, far beyond the reach of proof.",
"Happiness and unhappiness do not come from what you possess, nor from who you are, or what you do. Happiness and unhappiness come from your thoughts.",
"The pain in struggle is only temporary. You may feel it for a minute, an hour, a day, or a year. But if you give up, that pain will last forever.",
"Only someone who is afraid can act bravely. Without fear, there is nothing that can be called courage.",
"Be yourself. Who else can do it better than yourself?",
"Your opportunity to succeed in any situation can always be measured by how much you believe in yourself.",
"Our greatest pride is not never failing, but getting up every time we fall.",
"The work that never gets done is the work that never gets started.",
"Your mind is like a fire that needs to be ignited, not a vessel waiting to be filled.",
"Honesty is the cornerstone of all success. Recognition is the strongest motivation. Even criticism can build confidence when inserted between praise.",
"Everything has an end, let what has ended pass and believe that everything will be fine.",
"Every second is precious because time knows many things, including the secrets of the heart.",
"If you can't find the book you're looking for on the shelf, then write it yourself.",
"If your heart feels a lot of pain, then learn from that pain not to inflict pain on others.",
"Life is not always about a partner.",
"Home is not just a place, but it is a feeling.",
"Choose: The person who dreams of success or the person who makes it happen?",
"You may not be able to water a wilted flower and hope it will bloom again, but you can plant a new flower with better hope than before.",
"It is not happiness that makes us grateful, but it is gratitude that will make our lives happy.",
"I may be silent. But I am not blind.",
]