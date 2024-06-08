async function removeServer(interaction) {
  const Guilds = require("../database/schema");
  const existingServer = await Guilds.findOne({
    guildId: interaction.guildId,
  });

  if (existingServer) {
    const channelToDelete = [];
    if (existingServer.playersId) {
      channelToDelete.push(existingServer.playersId);
    }
    if (existingServer.statusChannelId) {
      channelToDelete.push(existingServer.statusChannelId);
    }
    if (channelToDelete.length > 0) {
      const guild = await interaction.client.guilds.fetch(interaction.guildId);
      for (const channelId of channelToDelete) {
        const channel = await guild.channels.fetch(channelId);
        await channel.delete();
      }
    }
    await existingServer.delete();
  }
}

module.exports = removeServer;
