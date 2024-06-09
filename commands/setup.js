const { PermissionsBitField, SlashCommandBuilder } = require("discord.js");

const logger = require("../utils/logger");
const addServer = require("../handlers/addServer.js");

const fs = require("fs");
const path = require("path");

/**
 * Represents a ping command.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Sets up the bot.")
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

    // Check if the user is an admin
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
        `(${interaction.guild.name}) @${interaction.user.username} tried to add guild to tracking while not being an admin.`
      );
    } else {
      // Check if bot as MANAGE_CHANNELS permission
      if (
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.Flags.ManageChannels
        )
      ) {
        await interaction.reply({
          content: TEXTS.NO_PERMISSION,
          ephemeral: true,
        });
        logger.info(
          `(${interaction.guild.name}) @${interaction.user.username} tried to add guild to tracking but the bot does not have the Manage Channel permission.`
        );
        return;
      }

      // Add server to database
      try {
        await interaction.deferReply({
          content: TEXTS.SERVER_TRACKING,
          ephemeral: true,
        });
        await addServer(interaction);
        await interaction.editReply({
          content: TEXTS.SERVER_TRACKED,
          ephemeral: true,
        });

        logger.info(
          `(${interaction.guild.name}) @${interaction.user.username} added guild to tracking.`
        );
      } catch (error) {
        await interaction.reply({
          content: TEXTS.ERROR_ADDING_SERVER,
          ephemeral: true,
        });

        logger.error(
          `(${interaction.guild.name}) @${interaction.user.username} encountered an error while trying to add the guild to tracking: ${error.message}`
        );
      }
    }
  },
};
