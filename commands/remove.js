const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const logger = require("../utils/logger");
const removeServer = require("../handlers/removeServer");

const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes guild from tracking."),
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

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      await interaction.reply({
        content: TEXTS.NOT_AN_ADMIN,
        ephemeral: true,
      });
      logger.info(
        `(${interaction.guild.name}) @${interaction.user.username} tried to remove guild from tracking while not being an admin.`
      );
      return;
    }
    try {
      await interaction.deferReply({
        content: TEXTS.SERVER_REMOVING,
        ephemeral: true,
      });
      await removeServer(interaction);
      await interaction.editReply({
        content: TEXTS.SERVER_REMOVED,
        ephemeral: true,
      });

      logger.info(
        `(${interaction.guild.name}) @${interaction.user.username} removed guild from tracking.`
      );
    } catch (error) {
      await interaction.reply({
        content: TEXTS.ERROR_REMOVING_SERVER,
        ephemeral: true,
      });
      logger.error(
        `(${interaction.guild.name}) @${interaction.user.username} encountered an error while trying to remove the guild from tracking: ${error.message}`
      );
    }
  },
};
