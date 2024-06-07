const { Client, Events, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./config.json');
const logger = require('./utils/logger');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	logger.info("Bot is ready to use!");
});

client.login(TOKEN);