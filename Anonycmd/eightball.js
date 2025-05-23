const eightBallResponses = [
    // Affirmative responses
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    
    // Non-committal responses
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    
    // Negative responses
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "No way!",
    "No chance.",
    "I wouldn't bet on it.",
    "That's unlikely.",
    "Not in your wildest dreams."
];

// Additional fun responses for specific questions
const specialResponses = {
    "should i cheat": "Absolutely not! Play fair!",
    "do you love me": "I'm a magic 8-ball, not a dating service!",
    "meaning of life": "42. Obviously.",
    "is this real": "As real as anything else in this simulation."
};

async function eightBallCommand(sock, chatId, question) {
    if (!question) {
        await sock.sendMessage(chatId, { text: 'Please ask a question!' });
        return;
    }

    // Convert to lowercase for case-insensitive matching
    const lowerQuestion = question.toLowerCase().trim();
    
    // Check for special responses
    for (const [key, response] of Object.entries(specialResponses)) {
        if (lowerQuestion.includes(key)) {
            await sock.sendMessage(chatId, { text: `🎱 ${response}` });
            return;
        }
    }

    // Get random response
    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    
    // Add some dramatic delay (1-3 seconds)
    const delay = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    await sock.sendMessage(chatId, { text: `🎱 ${randomResponse}` });
}

module.exports = { eightBallCommand };