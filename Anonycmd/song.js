const yts = require('yt-search');
const axios = require('axios');

async function playCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        const searchQuery = text.split(' ').slice(1).join(' ').trim();
        
        if (!searchQuery) {
            return await sock.sendMessage(chatId, { 
                text: "Example: .play Amagulu"
            });
        }

        // Search for the song
        const { videos } = await yts(searchQuery);
        if (!videos || videos.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: "No songs found!"
            });
        }

        // Send loading message
        await sock.sendMessage(chatId, {
            text: "```DOWNLOADING please wait....```"
        });

        // Get the first video result
        const video = videos[0];
        const videoUrl = video.url;
        
        // Format duration (convert seconds to MM:SS)
        const durationSeconds = video.seconds;
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Format views
        const views = video.views;
        const formattedViews = views.toLocaleString();

        // Fetch audio data from API
        const response = await axios.get(`https://apis-keith.vercel.app/download/dlmp3?url=${videoUrl}`);
        const data = response.data;

        if (!data || !data.status || !data.result || !data.result.downloadUrl) {
            return await sock.sendMessage(chatId, { 
                text: "Failed to fetch audio from the API. Please try again later."
            });
        }

        const audioUrl = data.result.downloadUrl;
        const title = data.result.title;

        // Create the formatted text
        const infoText = `
╔══════════════════❒
║ ⿻ *ᴛɪᴛʟᴇ:*  ${video.title}
║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${formattedDuration}
║ ⿻ *ᴠɪᴇᴡs:*  ${formattedViews}
║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${video.author.name}
║ ⿻ *ʟɪɴᴋ:*  ${videoUrl}
╚══════════════════❒
> *ANONYMOUS PLAYER*
        `.trim();

        // Send the audio with caption
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
            caption: infoText
        }, { quoted: message });

    } catch (error) {
        console.error('Error in song command:', error);
        await sock.sendMessage(chatId, { 
            text: "Download failed. Please try again later."
        });
    }
}

module.exports = playCommand;

//*Powered by Anonymous-bot*
