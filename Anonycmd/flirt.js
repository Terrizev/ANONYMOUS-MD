const fetch = require('node-fetch');

// Fallback flirt lines in case the API fails
const flirtLines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Do you have a map? I keep getting lost in your eyes.",
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
    "Your hand looks heavy—can I hold it for you?"
];

// Function to pick a random item from an array
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

async function flirtCommand(sock, chatId, senderId) {
    try {
        // Try to fetch from popcat.xyz API
        const API_URL = 'https://api.popcat.xyz/pickuplines';
        const response = await fetch(API_URL, {
            timeout: 5000 // 5 second timeout
        });
        
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }
        
        const { pickupline } = await response.json();
        const flirtMessage = pickupline;
        
        // Send the flirt message with mention to the sender
        await sock.sendMessage(chatId, { 
            text: flirtMessage,
            mentions: [senderId]
        });
    } catch (error) {
        console.error('Error in flirt command (API):', error);
        
        // Fallback to local flirt lines
        const randomFlirt = pickRandom(flirtLines);
        await sock.sendMessage(chatId, { 
            text: randomFlirt,
            mentions: [senderId]
        });
    }
}

module.exports = { flirtCommand }; 