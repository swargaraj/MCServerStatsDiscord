// Initializes the application by checking if the required configuration is provided.
const init = require('./utils/init');
init().catch(error => {
	console.error(error);
	process.exit(1);
});


const { Client, Events, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const logger = require('./utils/logger');
const { RateLimiter } = require('discord.js-rate-limiter');
const { TOKEN, MONGO_DB_URI } = require('./config.json');

// Create a new Discord.js client with the specified intents.
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });

// Create a new rate limiter with a maximum of 1 request every 2 seconds.
client.rateLimiter = new RateLimiter(1, 2000)

// Once the client is ready, set the bot's presence.
client.once(Events.ClientReady, readyClient => {
    logger.info("Bot is ready to use!");
    client.user.setPresence({
        activities: [{ name: `Minecraft Servers`, type: ActivityType.Watching }],
        status: 'idle',
    });
});

client.login(TOKEN);