/* PLEASE READ FIRST BRO

BASE: YANNRZY
DEVELOPER: TERRI
BOT NAME: ANONYMOUS-MD 
VERSION: 5.0.0 
UPDATE INFO: https://whatsapp.com/channel/0029Vb57ZHh7IUYcNttXEB3y
CREDITS @terri 
RESPECT THE DEVELOPER TO KEEP UPDATES COMING
*/


const fs = require('fs');
const path = require('path');
const { SESSION_MAX_AGE, CLEAN_INTERVAL } = require('./settings');

function startSessionCleaner() {
    const SESSION_DIR = path.join(__dirname, 'session');

    if (!fs.existsSync(SESSION_DIR)) {
        fs.mkdirSync(SESSION_DIR, { recursive: true });
    }

    setInterval(() => {
        try {
            const files = fs.readdirSync(SESSION_DIR);
            files.forEach(file => {
                const filePath = path.join(SESSION_DIR, file);
                const stats = fs.statSync(filePath);
                const lastAccess = new Date(stats.atime).getTime();

                if (Date.now() - lastAccess > SESSION_MAX_AGE) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                    console.log(`[AUTO-DELETE] Session ${file} dihapus ✅`);
                }
            });
        } catch (err) {
            console.error('Error auto delete session:', err);
        }
    }, CLEAN_INTERVAL);
}

module.exports = startSessionCleaner;
