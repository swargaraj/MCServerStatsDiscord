const {} = require("discord.js");
const pingMC = require("./pingMC");
const logger = require("./logger");

async function updateChannel(client) {
  const Guilds = require("../database/schema");
  const guilds = await Guilds.find({});
  logger.info(`[Cron] Updating ${guilds.length} guilds`);
  for (const guild of guilds) {
    const data = await pingMC(guild.ip, guild.port, guild.bedrock);

    let status;
    let newplayers;
    if (data.online) {
      status = "Status: Online 🟢";
      players = `Players: ${data.players.online}/${data.players.max}`;
    } else {
      status = "Status: Offline 🔴";
      players = "Players: N/A";
    }

    try {
      const playersChannel = await client.channels.fetch(
        guild.playersChannelId
      );

      await playersChannel.edit({
        name: players,
      });
    } catch (error) {
      logger.error(
        `Failed to update players channel name for guild ${guild.guildId}`
      );
    }

    try {
      const statusChannel = await client.channels.fetch(guild.statusChannelId);
      await statusChannel.edit({
        name: status,
      });
    } catch (error) {
      logger.error(
        `Failed to update status channel name for guild ${guild.guildId}`
      );
    }
  }
}

module.exports = updateChannel;
