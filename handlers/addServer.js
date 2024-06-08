const { ChannelType, PermissionsBitField } = require("discord.js");

async function addServer(interaction) {
  const Guilds = require("../database/schema");
  const existingServer = await Guilds.findOne({
    guildId: interaction.guildId,
  });

  if (existingServer) {
    let playersId;
    let statusId;

    try {
      await interaction.guild.channels.fetch(existingServer.statusChannelId);
      statusId = existingServer.statusChannelId;
    } catch (error) {
      const statusChannel = await interaction.guild.channels.create({
        name: "Status: Offline 🔴",
        type: ChannelType.GuildVoice,
        permissionOverwrites: [
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
        name: "Players: 0/40",
        type: ChannelType.GuildVoice,
        permissionOverwrites: [
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
      name: "Status: Offline 🔴",
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone, // ID of the @everyone role
          deny: PermissionsBitField.Flags.Connect,
        },
      ],
    });

    const playersChannel = await interaction.guild.channels.create({
      name: "Players: 0/40",
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
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
