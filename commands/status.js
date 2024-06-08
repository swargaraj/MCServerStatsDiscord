const { SlashCommandBuilder } = require("discord.js");

const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Status of guild's Minecraft server."),
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

    // TODO: Check if guild is being tracked. If yes, use that ip:port else return NO_SERVER_TRACKED

    logger.info(
      `(${interaction.guild.name}) @${interaction.user.username} tried /status`
    );

    await interaction.reply(`Server Information`);
  },
};
