const { SlashCommandBuilder } = require("discord.js");
const pingServer = require("../handlers/pingServer");

const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping your Minecraft server.")
    .addStringOption((option) =>
      option
        .setName("ip")
        .setDescription("The IP address of the Minecraft server.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("port")
        .setDescription("The port of the Minecraft server.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("bedrock")
        .setDescription("Is the server a Bedrock server?")
        .setRequired(true)
    ),
  cooldown: 5,
  async execute(interaction) {
    // Localize TEXTS
    const langPath = path.resolve(
      __dirname,
      `../lang/${interaction.locale}.js`
    );

    let TEXTS;
    if (fs.existsSync(langPath)) {
      TEXTS = require(`../lang/${interaction.locale}.js`);
    } else {
      TEXTS = require(`../lang/en-US.js`);
    }

    try {
      await interaction.deferReply();
      await pingServer(interaction);
    } catch (error) {
      await interaction.editReply({
        content: TEXTS.SOMETHING_WENT_WRONG,
      });
      logger.error(
        `(${interaction.guild.name}) @${interaction.user.username} encountered an error while trying to ping a server: ${error}`
      );
    }
  },
};
