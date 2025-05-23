const fetch = require('node-fetch');

// Enhanced fallback flirt lines with 10 new additions
const flirtLines = [
    // Original 20 lines
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Do you have a map? Because I keep getting lost in your eyes.",
    "Is your name Google? Because you have everything I'm searching for.",
    "Do you believe in love at first sight, or should I walk by again?",
    "If you were a vegetable, you'd be a cute-cumber!",
    "Are you a parking ticket? Because you've got FINE written all over you.",
    "Is your dad a baker? Because you're a cutie pie!",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    "If beauty were time, you'd be an eternity.",
    "Are you Wi-Fi? Because I'm really feeling a connection.",
    "Are you French? Because Eiffel for you.",
    "Can you lend me a kiss? I promise I'll give it back.",
    "Do you believe in fate? Because I think we've just met ours.",
    "Are you a campfire? Because you're hot and I want s'more.",
    "If I could rearrange the alphabet, I'd put U and I together.",
    "Are you a snowstorm? Because you've just made my heart race.",
    "Is your name Chapstick? Because you're da balm!",
    "Excuse me, but I think you dropped something: MY JAW!",
    "Are you a time traveler? Because I see you in my future.",
    "Your hand looks heavy—can I hold it for you?",

    // New additions
    "Are you a bank loan? Because you have my interest.",
    "Is your name Waldo? Because someone like you is hard to find.",
    "Do you have a name, or can I call you mine?",
    "Are you a snowflake? Because you’re one of a kind.",
    "Do you have a mirror in your pocket? Because I can see myself in your pants.",
    "Are you an alien? Because you just abducted my heart.",
    "If you were a fruit, you’d be a fineapple.",
    "Are you made of copper and tellurium? Because you’re Cu-Te.",
    "Did it hurt when you fell from heaven?",
    "Are you a dictionary? Because you add meaning to my life."
];

// Rest of the code remains unchanged
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

async function flirtCommand(sock, chatId, senderId) {
    try {
        const API_URL = 'https://api.popcat.xyz/pickuplines';
        const response = await fetch(API_URL, { timeout: 5000 });
        
        if (!response.ok) throw new Error(`API returned status ${response.status}`);
        
        const { pickupline } = await response.json();
        await sock.sendMessage(chatId, { 
            text: pickupline,
            mentions: [senderId]
        });
    } catch (error) {
        console.error('Error in flirt command (API):', error);
        const randomFlirt = pickRandom(flirtLines);
        await sock.sendMessage(chatId, { 
            text: randomFlirt,
            mentions: [senderId]
        });
    }
}

module.exports = { flirtCommand };