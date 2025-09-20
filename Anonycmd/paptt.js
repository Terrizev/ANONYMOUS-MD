let handler = async (m, { conn, prefix, command }) => {
    await m.reply('Photo has been sent to private chat >_<')
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)

  conn.sendMessage(m.sender, {
    image: {url: pickRandom(paptt) },
    caption: `Here's your random pap-tt ><`
  })
}
handler.help = ['paptt']
handler.tags = ['nsfw']
handler.command = ['paptt', 'pap-tt']

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const paptt = [ 
  "https://telegra.ph/file/5c62d66881100db561c9f.mp4",
  "https://telegra.ph/file/a5730f376956d82f9689c.jpg",
  "https://telegra.ph/file/8fb304f891b9827fa88a5.jpg",
  "https://telegra.ph/file/0c8d173a9cb44fe54f3d3.mp4",
  "https://telegra.ph/file/b58a5b8177521565c503b.mp4",
  "https://telegra.ph/file/34d9348cd0b420eca47e5.jpg",
  "https://telegra.ph/file/73c0fecd276c19560133e.jpg",
  "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
  "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
  "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
  "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
  "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
  'https://telegra.ph/file/c1599cc2424ec477dba9c.jpg',
  'https://telegra.ph/file/b855baefdec15510c8fdc.jpg',
  'https://telegra.ph/file/49f7b55ddfe2eba3a4e70.jpg',
  'https://telegra.ph/file/9b3e6f0c7e4f4b9dc3832.jpg',
  'https://telegra.ph/file/bf3444292b5c5e43cae2f.jpg',
  'https://telegra.ph/file/067e8dc26b6a7860d23e8.jpg',
  'https://telegra.ph/file/f0dfebc4a7cabdb2f18d4.jpg',
  'https://telegra.ph/file/5e5888813807387170227.jpg',
  'https://telegra.ph/file/85d92052a774e5fff90d3.jpg',
  'https://telegra.ph/file/7359e5d3c60962d3d5638.jpg',
  'https://telegra.ph/file/81466171835a42ceb8ef5.jpg',
  'https://telegra.ph/file/708bd8a7b0faa7f70078b.jpg',
  'https://telegra.ph/file/03d2778acd65eec07774f.jpg',
  'https://telegra.ph/file/ac3e6a46d5097365bee7d.jpg',
  'https://telegra.ph/file/810cb10e72ab1de7567b8.jpg',
  'https://telegra.ph/file/bb2890eb91aac9ea24084.jpg',
  'https://telegra.ph/file/59ff6a1ad944738d10cb5.jpg',
  'https://telegra.ph/file/4edeee22e6981dc65e116.jpg',
  'https://telegra.ph/file/ebf26e276a90ea52eeb03.jpg',
  'https://telegra.ph/file/595ed4cc6d33c85bbb266.jpg',
  'https://telegra.ph/file/20bdc9133add55672465a.jpg',
  'https://telegra.ph/file/a6f5b277d78fdebc59c11.jpg',
  'https://telegra.ph/file/4ba39741593bd18a27414.jpg',
  'https://telegra.ph/file/cfabf1adc3eda83b6bf50.jpg',
  'https://telegra.ph/file/c421cde8c8015f3ff870a.jpg',
  'https://telegra.ph/file/a92efe35f03a5b1380548.jpg',
  'https://telegra.ph/file/20c7e2cc4d48ad96577f7.jpg',
  'https://telegra.ph/file/1d0fad7ae5ee470bf8ec4.jpg',
  'https://telegra.ph/file/73cf2c2af00661dc241b4.jpg',
  'https://telegra.ph/file/c534bda9ddd02d2dfc02c.jpg',
  'https://telegra.ph/file/29b9d63971bca2dbc9def.jpg',
  'https://telegra.ph/file/b70cc42e27ce9fce33760.jpg',
  'https://telegra.ph/file/612277ee5e01346913ed2.jpg',
  'https://telegra.ph/file/a66fe3f4caa11a9884d68.jpg',
  'https://telegra.ph/file/fb6c019fc6d21e3d90e16.jpg',
  'https://telegra.ph/file/ee51a2125297766440dc6.jpg',
  'https://telegra.ph/file/58c13ffc4e9f46e531619.jpg',
  'https://telegra.ph/file/567b6440cc673af7d62c3.jpg',
  'https://telegra.ph/file/1be40b365ab187aea062d.jpg',
  'https://telegra.ph/file/d55722b2eab3c2cd9a636.jpg',
  'https://telegra.ph/file/58696efaa503641dee44d.jpg',
  'https://telegra.ph/file/5fddc12ec1fc965b16e66.jpg',
  'https://telegra.ph/file/2fafa3b5c5dbb0ba5de7f.jpg',
  'https://telegra.ph/file/49883e6a83459ba168480.jpg',
  'https://telegra.ph/file/209fe1c309cb74c8b1671.jpg',
  'https://telegra.ph/file/043996d5f18bd042750c6.jpg',
  'https://telegra.ph/file/761f92f07d43fbcd77e58.jpg',
  'https://telegra.ph/file/63f25862ac7cd6f26e782.jpg',
  'https://telegra.ph/file/3c42b93253ca6063b2be8.jpg',
  'https://telegra.ph/file/b657d69a13d0f40bfa50b.jpg',
  'https://telegra.ph/file/12c68c8a65f8b2fb47820.jpg',
  'https://telegra.ph/file/bdbacd6027a79c3ae28d4.jpg',
  'https://telegra.ph/file/140476cb094b90f50caf7.jpg',
  'https://telegra.ph/file/dc3b139cc938fd67362e7.jpg',
  'https://telegra.ph/file/2197e893f86ab365d9262.jpg',
  'https://telegra.ph/file/b4986b162b9362d21d6c1.jpg',
  'https://telegra.ph/file/12b8f6f5a9e0c9d9825b1.jpg',
  'https://telegra.ph/file/4c0959cbbb38720a864d1.jpg',
  'https://telegra.ph/file/0aff0e5acdac17cf5ed0c.jpg',
  'https://telegra.ph/file/6331436680c27e512a72b.jpg',
  'https://telegra.ph/file/11b1a5d94895c145e01bb.jpg',
  'https://telegra.ph/file/b78526a218d6e87b9b705.jpg',
  'https://telegra.ph/file/803427fe8f503de9aa619.jpg'
];