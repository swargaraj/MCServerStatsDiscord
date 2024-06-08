// Check if the config.json file exists
try {
  require("./config.json");
} catch (error) {
  logger.error(
    "config.json file not found. Please create one and enter your token and MongoDB URI."
  );
  process.exit(1);
}

// Log any uncaught exceptions.
process.on("uncaughtException", (error, source) => {
  logger.error(error.toString());
});

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
  Collection,
  REST,
  Routes,
} = require("discord.js");

const logger = require("./utils/logger");
const { RateLimiter } = require("discord.js-rate-limiter");
const mongoose = require("mongoose");
const registerCommands = require("./utils/registerCommands");
const fs = require("fs");

const { TOKEN, MONGO_DB_URI, CLIENT_ID } = require("./config.json");

if (!TOKEN || !CLIENT_ID) {
  logger.error("Bot token or Client ID is not provided in config.json");
}

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

const commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

try {
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.data.name, command);
  }
} catch (error) {
  logger.error(error);
}

const commandJSON = commands.map((command) => command.data.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commandJSON,
    });
    logger.info("Commands Loaded");
  } catch (error) {
    logger.error(error);
  }
})();

// Handle interactions.
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    logger.error(
      `There was an error while executing /${interaction.commandName}.`
    );
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(TOKEN);
