const fs = require('fs');
const path = require('path');

// Function to clear tmp directory
async function clearTmpDirectory() {
    try {
        const tmpDir = path.join(process.cwd(), 'tmp');
        
        // Check if tmp directory exists
        if (!fs.existsSync(tmpDir)) {
            return { success: false, message: 'Temporary directory does not exist!' };
        }

        // Read all files in tmp directory
        const files = fs.readdirSync(tmpDir);
        
        if (files.length === 0) {
            return { success: true, message: 'Temporary directory is already empty!' };
        }

        // Delete each file
        let deletedCount = 0;
        for (const file of files) {
            try {
                const filePath = path.join(tmpDir, file);
                fs.unlinkSync(filePath);
                deletedCount++;
            } catch (err) {
                console.error(`Error deleting file ${file}:`, err);
            }
        }

        return { 
            success: true, 
            message: `Successfully cleared ${deletedCount} temporary files!`,
            count: deletedCount
        };

    } catch (error) {
        console.error('Error in clearTmpDirectory:', error);
        return { 
            success: false, 
            message: 'Failed to clear temporary files!',
            error: error.message
        };
    }
}

// Function to handle manual command
async function clearTmpCommand(sock, chatId, msg) {
    try {
        // Check if user is owner
        const isOwner = msg.key.fromMe;
        if (!isOwner) {
            await sock.sendMessage(chatId, { 
                text: '❌ This command is only available for the owner!' 
            });
            return;
        }

        const result = await clearTmpDirectory();
        
        if (result.success) {
            await sock.sendMessage(chatId, { 
                text: `✅ ${result.message}` 
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: `❌ ${result.message}` 
            });
        }

    } catch (error) {
        console.error('Error in cleartmp command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to clear temporary files!' 
        });
    }
}

// Start automatic clearing every 6 hours
function startAutoClear() {
    // Run immediately on startup
    clearTmpDirectory().then(result => {
        if (result.success) {
            console.log(`[Auto Clear] ${result.message}`);
        } else {
            console.error(`[Auto Clear] ${result.message}`);
        }
    });

    // Set interval for every 6 hours
    setInterval(async () => {
        const result = await clearTmpDirectory();
        if (result.success) {
            console.log(`[Auto Clear] ${result.message}`);
        } else {
            console.error(`[Auto Clear] ${result.message}`);
        }
    }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
}

// Start the automatic clearing
startAutoClear();

module.exports = clearTmpCommand; 