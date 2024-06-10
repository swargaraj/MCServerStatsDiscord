const { SlashCommandBuilder } = require("discord.js");
const statusServer = require("../handlers/statusServer");

const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Status of guild's Minecraft server."),
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

    // TODO: Check if guild is being tracked. If yes, use that ip:port else return NO_SERVER_TRACKED

    try {
      await interaction.deferReply();
      await statusServer(interaction);
    } catch (error) {
      await interaction.editReply({
        content: TEXTS.SOMETHING_WENT_WRONG,
      });
      logger.error(
        `(${interaction.guild.name}) @${interaction.user.username} encountered an error while trying to ping guild's server: ${error}`
      );
    }
  },
};
