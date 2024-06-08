// Check if the config.json file exists
try {
  require("./config.json");
} catch (error) {
  logger.error(
    "config.json file not found. Please create one and enter your token and MongoDB URI."
  );
  process.exit(1);
}

const {
  Client,
  Events,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");

const logger = require("./utils/logger");
const { RateLimiter } = require("discord.js-rate-limiter");
const mongoose = require("mongoose");

const { TOKEN, MONGO_DB_URI } = require("./config.json");

if (!TOKEN) {
  logger.error("Bot token is not provided in config.json");
}

// Log any uncaught exceptions.
process.on("uncaughtException", (error, source) => {
  logger.error(error.toString());
});

// Connect to the MongoDB database.
if (MONGO_DB_URI) {
  mongoose
    .connect(MONGO_DB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      logger.info("Connected to Database");
    })
    .catch((error) => {
      logger.error(error);
      process.exit(1);
    });
} else {
  logger.warn(
    "MongoDB URI is not provided in config.json. Server status tracking is disabled for all guilds."
  );
}

// Create a new Discord.js client with the specified intents.
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

// Create a new rate limiter with a maximum of 1 request every 2 seconds.
client.rateLimiter = new RateLimiter(1, 2000);

// Once the client is ready, set the bot's presence.
client.once(Events.ClientReady, (readyClient) => {
  logger.info("Bot Started");
  client.user.setPresence({
    activities: [{ name: `Minecraft Servers`, type: ActivityType.Watching }],
    status: "idle",
  });
});

client.login(TOKEN);
