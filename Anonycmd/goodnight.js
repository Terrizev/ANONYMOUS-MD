const fetch = require('node-fetch');

async function goodnightCommand(sock, chatId) {
    try {
        const shizokeys = 'Anonymousbot;
        const res = await fetch(`https://api.shizo.top/api/quote/gnsd?apikey=${shizokeys}`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const goodnightMessage = json.result;

        // Send the goodnight message
        await sock.sendMessage(chatId, { text: goodnightMessage });
    } catch (error) {
        console.error('Error in goodnight command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get goodnight message. Please try again later!' });
    }
}

module.exports = { goodnightCommand }; 