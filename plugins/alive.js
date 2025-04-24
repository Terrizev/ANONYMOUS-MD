/// credits to 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧


smd(
  {
    pattern: "alive",
    desc: "Shows system status with different designs.",
    category: "general",
    filename: __filename,
    use: "alive",
  },
  async (message, input) => {
    try {
      const start = new Date().getTime();
      
      // Local rep instead of API
      const quotes = [
        {body: "The only way to do great work is to love what you do.", author: "Steve Jobs"},
        {body: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs"},
        {body: "Stay hungry, stay foolish.", author: "Steve Jobs"},
        {body: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs"},
        {body: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela"}
      ];

      const facts = [
        "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
        "Octopuses have three hearts, nine brains, and blue blood.",
        "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
        "A group of flamingos is called a 'flamboyance'.",
        "Bananas are berries, but strawberries aren't."
      ];

      const lines = [
        "The future belongs to those who believe in the beauty of their dreams.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "Life is what happens when you're busy making other plans."
      ];

      const designs = [
        async () => {
          const quote = quotes[Math.floor(Math.random() * quotes.length)];
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          
          const asciiArt = `
╔══════════════════════╗
║     ANONYMOUS-MD    ║
╚══════════════════════╝
          
• Response Rate: ${pingSeconds} seconds

*"${quote.body}"*
- ${quote.author}

╔══════════════════════╗
║     ANONYMOUS-MD    ║
╚══════════════════════╝
          `;
          
          return { text: asciiArt };
        },
        async () => {
          const fact = facts[Math.floor(Math.random() * facts.length)];
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          
          const asciiArt = `
┌──────────────────────┐
│    ANONYMOUS-MD     │
├──────────────────────┤
│ • Response Rate: ${pingSeconds}s │
├──────────────────────┤
│ *Did You Know?*      │
│ ${fact}             │
└──────────────────────┘
          `;
          
          return { text: asciiArt };
        },
        async () => {
          const line = lines[Math.floor(Math.random() * lines.length)];
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          
          const asciiArt = `
╭──────────────────────╮
│   ████ ANONYMOUS-MD ████  │
├──────────────────────┤
│ Response: ${pingSeconds}s  │
├──────────────────────┤
│ ${line}             │
╰──────────────────────╯
          `;
          
          return { text: asciiArt };
        },
        async () => {
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          
          const asciiArt = `
  _____ _____ _____ _____ 
 |     |     |     |     |
 | A N O N Y M O U S-MD  |
 |_____|_____|_____|_____|
 |                       |
 | Uptime: ${pingSeconds}s       |
 |                       |
 | "System Operational"  |
 |_____ _____ _____ _____|
          `;
          
          return { text: asciiArt };
        }
      ];

      const randomDesign = designs[Math.floor(Math.random() * designs.length)];
      const messageData = await randomDesign();

      const message_options = {
        quoted: message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
        },
      };

      return await message.send(messageData, message_options);
    } catch (error) {
      await message.error(
        error + "\n\nCommand: alive",
        error,
        "*Failed to show status.*"
      );
    }
  }
);
