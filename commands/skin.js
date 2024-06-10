const { SlashCommandBuilder } = require("discord.js");
const skinSearch = require("../handlers/skinSearch.js");

const logger = require("../utils/logger.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skin")
    .setDescription("Get a player's skin.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the player.")
        .setRequired(true)
    ),
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
      await skinSearch(interaction);
    } catch (error) {
      await interaction.editReply({
        content: TEXTS.SOMETHING_WENT_WRONG,
      });
      logger.error(
        `(${interaction.guild.name}) @${interaction.user.username} encountered an error while trying to search for skin: ${error}`
      );
    }
  },
};
