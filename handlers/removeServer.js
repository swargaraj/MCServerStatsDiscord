const logger = require("../utils/logger");

async function removeServer(interaction) {
  const Guilds = require("../database/schema");
  const existingServer = await Guilds.findOne({
    guildId: interaction.guildId,
  });

  if (existingServer) {
    try {
      const playersChannel = await interaction.guild.channels.fetch(
        existingServer.playersChannelId
      );
      await playersChannel.delete();
    } catch (error) {
      logger.info(
        `(${interaction.guild.name}) @${interaction.user.username} tried to delete guild from tracking. Maybe user have already deleted the players channel.`
      );
    }
    try {
      const statusChannel = await interaction.guild.channels.fetch(
        existingServer.statusChannelId
      );
      await statusChannel.delete();
    } catch (error) {
      logger.info(
        `(${interaction.guild.name}) @${interaction.user.username} tried to delete guild from tracking. Maybe user have already deleted the status channel.`
      );
    }

    await Guilds.findByIdAndDelete(existingServer._id);
  }
}

module.exports = removeServer;
