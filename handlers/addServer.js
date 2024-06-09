const { ChannelType, PermissionsBitField } = require("discord.js");
const pingMC = require("../utils/pingMC");

async function addServer(interaction) {
  const Guilds = require("../database/schema");
  const existingServer = await Guilds.findOne({
    guildId: interaction.guildId,
  });

  const ip = interaction.options.getString("ip");
  const port = interaction.options.getInteger("port");
  const bedrock = interaction.options.getBoolean("bedrock");

  const data = await pingMC(ip, port, bedrock);

  let status;
  let players;
  if (data.online) {
    status = "Status: Online 🟢";
    players = `Players: ${data.players.online}/${data.players.max}`;
  } else {
    status = "Status: Offline 🔴";
    players = "Players: N/A";
  }

  if (existingServer) {
    let playersId;
    let statusId;

    try {
      await interaction.guild.channels.fetch(existingServer.statusChannelId);
      statusId = existingServer.statusChannelId;
    } catch (error) {
      const statusChannel = await interaction.guild.channels.create({
        name: status,
        type: ChannelType.GuildVoice,
        permissionOverwrites: [
          {
            id: interaction.client.user.id,
            allow:
              PermissionsBitField.Flags.Connect |
              PermissionsBitField.Flags.ViewChannel,
          },
          {
            id: interaction.guild.roles.everyone, // ID of the @everyone role
            deny: PermissionsBitField.Flags.Connect,
          },
        ],
      });
      statusId = statusChannel.id;
    }

    try {
      await interaction.guild.channels.fetch(existingServer.playersChannelId);
      playersId = existingServer.playersChannelId;
    } catch (error) {
      const playersChannel = await interaction.guild.channels.create({
        name: players,
        type: ChannelType.GuildVoice,
        permissionOverwrites: [
          {
            id: interaction.client.user.id,
            allow:
              PermissionsBitField.Flags.Connect |
              PermissionsBitField.Flags.ViewChannel,
          },
          {
            id: interaction.guild.roles.everyone, // ID of the @everyone role
            deny: PermissionsBitField.Flags.Connect,
          },
        ],
      });

      playersId = playersChannel.id;
    }

    // Update existing server info
    existingServer.statusChannelId = statusId;
    existingServer.playersChannelId = playersId;
    existingServer.ip = interaction.options.getString("ip");
    existingServer.port = interaction.options.getInteger("port");
    existingServer.bedrock = interaction.options.getBoolean("bedrock");
    await existingServer.save();
  } else {
    // Create two new channels
    const statusChannel = await interaction.guild.channels.create({
      name: status,
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        {
          id: interaction.client.user.id,
          allow:
            PermissionsBitField.Flags.Connect |
            PermissionsBitField.Flags.ViewChannel,
        },
        {
          id: interaction.guild.roles.everyone, // ID of the @everyone role
          deny: PermissionsBitField.Flags.Connect,
        },
      ],
    });

    const playersChannel = await interaction.guild.channels.create({
      name: players,
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        {
          id: interaction.client.user.id,
          allow:
            PermissionsBitField.Flags.Connect |
            PermissionsBitField.Flags.ViewChannel,
        },
        {
          id: interaction.guild.roles.everyone, // ID of the @everyone role
          deny: PermissionsBitField.Flags.Connect,
        },
      ],
    });

    const server = {
      guildId: interaction.guildId,
      statusChannelId: statusChannel.id,
      playersChannelId: playersChannel.id,
      ip: interaction.options.getString("ip"),
      port: interaction.options.getInteger("port"),
      bedrock: interaction.options.getBoolean("bedrock"),
    };

    await Guilds.create(server);
  }
}

module.exports = addServer;
