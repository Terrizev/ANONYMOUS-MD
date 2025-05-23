const { channelInfo } = require('../lib/messageConfig');

async function characterCommand(sock, chatId, message) {
    try {
        let userToAnalyze;
        const context = message.message?.extendedTextMessage?.contextInfo;

        // Handle user identification
        if (context?.mentionedJid?.length > 0) {
            userToAnalyze = context.mentionedJid[0];
        } else if (context?.participant) {
            userToAnalyze = context.participant;
        }

        // JID validation regex
        const isValidJID = (jid) => /^\d+@s\.whatsapp\.net$/.test(jid);

        // Self-analysis handling
        if (!userToAnalyze && message.key.fromMe) {
            return await sock.sendMessage(chatId, {
                text: "🌟 Self-Analysis Protocol:\n" +
                      "While self-reflection is valuable, this tool is designed for analyzing others.\n\n" +
                      "How to use:\n" +
                      "1. Reply to a message with /character\n" +
                      "2. Mention someone: /character @user\n" +
                      "3. Analyze group dynamics: /character @group",
                ...channelInfo
            });
        }

        // Input validation
        if (!userToAnalyze || !isValidJID(userToAnalyze)) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ Invalid Input Format\n' +
                      'Please use one of these formats:\n' +
                      '• Reply to a message: /character\n' +
                      '• Mention a user: /character @username\n' +
                      '• Group analysis: /character @groupname',
                ...channelInfo
            });
        }

        // Profile picture handling with timeout
        let profilePic;
        try {
            profilePic = await Promise.race([
                sock.profilePictureUrl(userToAnalyze, 'image'),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Timeout')), 5000))
            ]);
        } catch (error) {
            profilePic = 'https://i.imgur.com/2wzGhpF.jpeg';
        }

        // Enhanced Personality Matrix
        const traitSystem = {
            categories: {
                strengths: {
                    pool: [
                        "Innovative Strategist", "Emotional Architect", "Resilient Visionary",
                        "Data Alchemist", "Cross-Pollinator", "Ethical Navigator",
                        "Adaptive Synthesizer", "Collaborative Catalyst"
                    ],
                    range: [75, 95]
                },
                neutrals: {
                    pool: [
                        "Calculated Risk-Taker", "Tradition Interpreter", 
                        "Precision Engineer", "Systemic Observer",
                        "Balanced Realist", "Procedural Specialist"
                    ],
                    range: [45, 75]
                },
                challenges: {
                    pool: [
                        "Optimal Perfectionist", "Metacognitive Analyst",
                        "Evolutionary Skeptic", "Efficiency Maximizer",
                        "Contextual Overthinker", "Boundary Protector"
                    ],
                    range: [25, 60]
                }
            },
            archetypes: {
                visionary: {
                    traits: ["Innovative Strategist", "Resilient Visionary", "Adaptive Synthesizer"],
                    quote: "✨ \"The best way to predict the future is to create it.\" - Abraham Lincoln"
                },
                analyst: {
                    traits: ["Data Alchemist", "Precision Engineer", "Metacognitive Analyst"],
                    quote: "🔍 \"Without data, you're just another person with an opinion.\" - W. Edwards Deming"
                },
                diplomat: {
                    traits: ["Emotional Architect", "Collaborative Catalyst", "Ethical Navigator"],
                    quote: "🤝 \"We rise by lifting others.\" - Robert Ingersoll"
                }
            }
        };

        // Generate personality profile
        const analysis = {
            strengths: selectTraits(traitSystem.categories.strengths.pool, 3),
            neutrals: selectTraits(traitSystem.categories.neutrals.pool, 2),
            challenges: selectTraits(traitSystem.categories.challenges.pool, 2),
            archetype: 'Neutral Observer',
            quote: '💡 "Understanding is the first step to acceptance." - J.K. Rowling'
        };

        // Determine archetype
        for (const [type, data] of Object.entries(traitSystem.archetypes)) {
            if (analysis.strengths.some(t => data.traits.includes(t))) {
                analysis.archetype = type.charAt(0).toUpperCase() + type.slice(1);
                analysis.quote = data.quote;
                break;
            }
        }

        // Generate scoring system
        const scoreTrait = (pool, [min, max]) => 
            pool.map(trait => ({
                trait,
                score: Math.floor(Math.random() * (max - min + 1)) + min
            }));

        const sections = [
            { title: 'Core Strengths', data: scoreTrait(analysis.strengths, traitSystem.categories.strengths.range), icon: '🚀' },
            { title: 'Neutral Traits', data: scoreTrait(analysis.neutrals, traitSystem.categories.neutrals.range), icon: '⚖️' },
            { title: 'Growth Frontiers', data: scoreTrait(analysis.challenges, traitSystem.categories.challenges.range), icon: '📈' }
        ];

        // Build analysis report
        const analysisReport = 
            `📚 **Advanced Personality Matrix Report**\n\n` +
            `👤 Subject: @${userToAnalyze.split('@')[0]}\n` +
            `🧩 Primary Archetype: ${analysis.archetype}\n\n` +
            sections.map(s => 
                `${s.icon} *${s.title}*\n` +
                s.data.map(d => `▫️ ${d.trait}: ${d.score}%`).join('\n')
            ).join('\n\n') +
            `\n\n💭 Archetypal Insight:\n${analysis.quote}\n\n` +
            `🔬 Analytical Basis:\n` +
            `- Trait Factor Analysis (TFA)\n` +
            `- Behavioral Pattern Recognition\n` +
            `- Social Interaction Modeling\n` +
            `*Results should be interpreted as probabilistic estimates, not absolute measures.*`;

        // Send final response
        await sock.sendMessage(chatId, {
            image: { url: profilePic },
            caption: analysisReport,
            mentions: [userToAnalyze],
            ...channelInfo
        });

    } catch (error) {
        console.error('Character Analysis Error:', error);
        await sock.sendMessage(chatId, {
            text: '⚠️ Cognitive Analysis Module Unavailable\n' +
                  'Our systems are experiencing heightened neural load.\n' +
                  'Please try again later or contact support@psych.ai',
            ...channelInfo
        });
    }
}

// Helper function for trait selection
function selectTraits(pool, count) {
    return [...pool]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .sort((a, b) => a.localeCompare(b));
}

module.exports = characterCommand;