const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'messageCount.json');

function loadMessageCounts() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return {};
}

function saveMessageCounts(messageCounts) {
    fs.writeFileSync(dataFilePath, JSON.stringify(messageCounts, null, 2));
}

function incrementMessageCount(groupId, userId) {
    const messageCounts = loadMessageCounts();

    if (!messageCounts[groupId]) {
        messageCounts[groupId] = {};
    }

    if (!messageCounts[groupId][userId]) {
        messageCounts[groupId][userId] = 0;
    }

    messageCounts[groupId][userId] += 1;

    saveMessageCounts(messageCounts);
}

function topMembers(sock, chatId, isGroup) {
    if (!isGroup) {
        sock.sendMessage(chatId, { text: 'This command is only available in group chats.' });
        return;
    }

    const messageCounts = loadMessageCounts();
    const groupCounts = messageCounts[chatId] || {};

    const sortedMembers = Object.entries(groupCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    if (sortedMembers.length === 0) {
        sock.sendMessage(chatId, { text: 'No message activity recorded yet.' });
        return;
    }

    let message = '🏆 *Top Active Members* 🏆\n';
    message += '───────────────────────\n\n';
    
    sortedMembers.forEach(([userId, count], index) => {
        let rank;
        switch (index) {
            case 0:
                rank = '🥇';
                break;
            case 1:
                rank = '🥈';
                break;
            case 2:
                rank = '🥉';
                break;
            default:
                rank = `${index + 1}.`;
        }
        message += `${rank} @${userId.split('@')[0]} - ${count} messages\n`;
    });
    
    message += '\n💬 Keep the conversation going!';

    sock.sendMessage(chatId, { 
        text: message, 
        mentions: sortedMembers.map(([userId]) => userId) 
    });
}

module.exports = { incrementMessageCount, topMembers };