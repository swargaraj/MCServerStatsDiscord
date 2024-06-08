const {
  GatewayIntentBits,
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");
const logger = require("../utils/logger");

/**
 * Represents a ping command.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Sets up the bot."),
  cooldown: 5,
  async execute(interaction) {
    // Check if the user is an admin
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      await interaction.reply({
        content: "You need to be an admin to run this command.",
        ephemeral: true,
      });
      logger.info(
        `@${interaction.user.username} tried the /setup command being a non-admin in ${interaction.guild.name}.`
      );
    } else {
      await interaction.reply({
        // Logic here
        content: "Server setup complete.",
      });

      logger.info(
        `@${interaction.user.username} used the /setup command in ${interaction.guild.name}.`
      );
    }
  },
};
