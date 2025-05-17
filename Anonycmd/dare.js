const dares = [
    "Sing a song for the group!",
    "Do 10 push-ups.",
    "Talk in a funny accent for the next 5 minutes.",
    "Send a selfie doing a funny face.",
    "Let someone text anything they want from your phone.",
    "Eat a spoonful of a condiment you don't like.",
    "Do a handstand against the wall for 30 seconds.",
    "Call a friend and sing 'Happy Birthday' to them, even if it's not their birthday.",
    "Attempt to breakdance for 1 minute.",
    "Pretend to be a robot until your next turn.",
    "Let the group choose a new hairstyle for you.",
    "Read the last text message you received out loud.",
    "Do your best impression of a celebrity.",
    "Recite a poem in the most dramatic tone possible.",
    "Go outside and yell 'I love [random object]!' as loud as you can.",
    "Do a plank for one minute without stopping.",
    "Speak only in rhymes for the next three rounds.",
    "Wear your clothes inside out for the remainder of the game.",
    "Text your crush a random emoji without any context.",
    "Balance a spoon on your nose for 30 seconds."
];

async function dareCommand(sock, chatId) {
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    await sock.sendMessage(chatId, { text: `🔥 Dare: ${randomDare}` });
}

module.exports = { dareCommand };
