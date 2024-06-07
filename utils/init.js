/**
 * Initializes the application by checking if the required configuration is provided.
 *
 * @return {Promise<void>} Resolves when initialization is complete.
 * @throws {Error} If the config.json file is not found or if the required configuration is missing.
 */
module.exports = async function init() {
	// Load the configuration from config.json
	const { TOKEN, MONGO_DB_URI } = require('../config.json');
	const logger = require('./logger');

	try {
		// Check if the config.json file exists
		require('../config.json');
	} catch (error) {
		logger.error("config.json file not found. Please create one and enter your token and MongoDB URI.");
		process.exit(1);
	}
	
	if (!TOKEN || !MONGO_DB_URI) {
		// Check if the required configuration is provided
		const message = TOKEN ? "MongoDB URI is not provided in config.json. Server status tracking is disabled for all guilds." : "Bot token is not provided in config.json";
		logger[TOKEN ? "warn" : "error"](message);
	}
};

