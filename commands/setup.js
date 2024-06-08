const {
  GatewayIntentBits,
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");

const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

/**
 * Represents a ping command.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Sets up the bot."),
  cooldown: 5,
  async execute(interaction) {
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

      logger.info(
        `(${interaction.guild.name}) @${interaction.user.username} added guild to tracking.`
      );
      await interaction.reply({
        content: TEXTS.SERVER_TRACKED,
        ephemeral: true,
      });
    }
  },
};
