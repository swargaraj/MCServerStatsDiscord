const { REST, Routes, Collection } = require("discord.js");

/**
 * Register all commands with Discord.
 * @returns {Collection} The collection of commands.
 */
module.exports = async function registerCommands() {
  const commands = new Collection();

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  try {
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.set(command.data.name, command);
    }
  } catch (error) {
    logger.error(error);
  }

  const commandJSON = commands.map((command) => command.data.toJSON());

  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commandJSON,
    });
    logger.info("Commands Loaded");
  } catch (error) {
    logger.error(error);
  }

  return commands; // Return the collection of commands
};
