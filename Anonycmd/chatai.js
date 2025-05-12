const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const USER_CHATAI_DATA = path.join(__dirname, '../data/userChataiData.json');

// In-memory storage for chat history and user info
const chatMemory = {
    messages: new Map(), // Stores last 20 messages per user
    userInfo: new Map()  // Stores user information
};

// Load user chatai data
function loadUserChataiData() {
    try {
        return JSON.parse(fs.readFileSync(USER_CHATAI_DATA));
    } catch (error) {
        console.error('❌ Error loading chatai data:', error.message);
        return { chatai: {} };
    }
}

// Save user chatai data
function saveUserChataiData(data) {
    try {
        fs.writeFileSync(USER_CHATAI_DATA, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('❌ Error saving chatai data:', error.message);
    }
}

// Add random delay between 2-5 seconds
function getRandomDelay() {
    return Math.floor(Math.random() * 3000) + 2000;
}

// Add typing indicator
async function showTyping(sock, chatId) {
    try {
        await sock.presenceSubscribe(chatId);
        await sock.sendPresenceUpdate('composing', chatId);
        await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
    } catch (error) {
        console.error('Typing indicator error:', error);
    }
}

// Extract user information from messages
function extractUserInfo(message) {
    const info = {};
    
    // Extract name
    if (message.toLowerCase().includes('my name is')) {
        info.name = message.split('my name is')[1].trim().split(' ')[0];
    }
    
    // Extract age
    if (message.toLowerCase().includes('i am') && message.toLowerCase().includes('years old')) {
        info.age = message.match(/\d+/)?.[0];
    }
    
    // Extract location
    if (message.toLowerCase().includes('i live in') || message.toLowerCase().includes('i am from')) {
        info.location = message.split(/(?:i live in|i am from)/i)[1].trim().split(/[.,!?]/)[0];
    }
    
    return info;
}

async function handleChataiCommand(sock, chatId, message, match) {
    if (!match) {
        await showTyping(sock, chatId);
        return sock.sendMessage(chatId, {
            text: `*CHATAI SETUP*\n\n*.chatai on*\nEnable chatai\n\n*.chatai off*\nDisable chatai in this chat`,
            quoted: message
        });
    }

    const data = loadUserChataiData();
    
    // Handle group chat attempts
    if (chatId.endsWith('@g.us')) {
        await showTyping(sock, chatId);
        return sock.sendMessage(chatId, {
            text: '❌ Chatai is only available in private chats. Message me directly to use this feature.',
            quoted: message
        });
    }

    // Get bot's number
    const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const senderId = message.key.participant || message.participant || message.pushName || message.key.remoteJid;
    const isOwner = senderId === botNumber;

    // Handle private chat
    if (isOwner) {
        // Bot owner can enable/disable for any user
        if (match === 'on') {
            data.chatai[chatId] = true;
            saveUserChataiData(data);
            return sock.sendMessage(chatId, { 
                text: `*Chatai has been enabled for this chat*`,
                quoted: message
            });
        }
        if (match === 'off') {
            delete data.chatai[chatId];
            saveUserChataiData(data);
            return sock.sendMessage(chatId, { 
                text: `*Chatai has been disabled for this chat*`,
                quoted: message
            });
        }
    } else {
        // Regular users can only modify their own chat
        if (senderId !== chatId) {
            await showTyping(sock, chatId);
            return sock.sendMessage(chatId, {
                text: '❌ You can only enable/disable chatai for your own chat.',
                quoted: message
            });
        }

        if (match === 'on') {
            if (data.chatai[chatId]) {
                return sock.sendMessage(chatId, { 
                    text: '*Chatai is already enabled for this chat*',
                    quoted: message
                });
            }
            data.chatai[chatId] = true;
            saveUserChataiData(data);
            return sock.sendMessage(chatId, { 
                text: '*Chatai has been enabled for this chat*',
                quoted: message
            });
        }

        if (match === 'off') {
            if (!data.chatai[chatId]) {
                return sock.sendMessage(chatId, { 
                    text: '*Chatai is already disabled for this chat*',
                    quoted: message
                });
            }
            delete data.chatai[chatId];
            saveUserChataiData(data);
            return sock.sendMessage(chatId, { 
                text: '*Chatai has been disabled for this chat*',
                quoted: message
            });
        }
    }

    await showTyping(sock, chatId);
    return sock.sendMessage(chatId, { 
        text: '*Invalid command. Use .chatai to see usage*',
        quoted: message
    });
}

async function handleChataiResponse(sock, chatId, message, userMessage, senderId) {
    const data = loadUserChataiData();
    
    // Only respond in private chats with chatai enabled
    if (!chatId.endsWith('@s.whatsapp.net') || !data.chatai[chatId]) return;

    try {
        // Initialize user's chat memory
        if (!chatMemory.messages.has(senderId)) {
            chatMemory.messages.set(senderId, []);
            chatMemory.userInfo.set(senderId, {});
        }

        // Extract and update user information
        const userInfo = extractUserInfo(userMessage);
        if (Object.keys(userInfo).length > 0) {
            chatMemory.userInfo.set(senderId, {
                ...chatMemory.userInfo.get(senderId),
                ...userInfo
            });
        }

        // Maintain message history
        const messages = chatMemory.messages.get(senderId);
        messages.push(userMessage);
        if (messages.length > 20) messages.shift();
        chatMemory.messages.set(senderId, messages);

        // Show typing indicator
        await showTyping(sock, chatId);

        // Get AI response
        const response = await getAIResponse(userMessage, {
            messages: messages,
            userInfo: chatMemory.userInfo.get(senderId)
        });

        if (!response) {
            return sock.sendMessage(chatId, { 
                text: "Hmm, let me think about that... 🤔",
                quoted: message
            });
        }

        // Add human-like delay
        await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

        // Send response
        await sock.sendMessage(chatId, { text: response }, { quoted: message });

    } catch (error) {
        console.error('❌ Chatai error:', error);
        await sock.sendMessage(chatId, { 
            text: "Oops! 😅 Let's try that again...",
            quoted: message
        });
    }
}

async function getAIResponse(userMessage, userContext) {
    try {
        const prompt = `
[Same prompt as original but replace "Chatbot" with "Chatai"]
        `.trim();

        const response = await fetch("https://api.dreaded.site/api/chatgpt?text=" + encodeURIComponent(prompt));
        const data = await response.json();
        
        // [Same response processing as original]
        return cleanedResponse;

    } catch (error) {
        console.error("AI API error:", error);
        return null;
    }
}

module.exports = {
    handleChataiCommand,
    handleChataiResponse
};