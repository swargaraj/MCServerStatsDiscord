const logger = require("../utils/logger");
const pingMC = require("../utils/pingMC");

const fs = require("fs");
const path = require("path");

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

async function pingServer(interaction) {
  // Localize TEXTS
  const langPath = path.resolve(__dirname, `../lang/${interaction.locale}.js`);

  let TEXTS;
  if (fs.existsSync(langPath)) {
    TEXTS = require(`../lang/${interaction.locale}.js`);
  } else {
    TEXTS = require(`../lang/en-US.js`);
  }

  const ip = interaction.options.getString("ip");
  const port = interaction.options.getInteger("port");
  const bedrock = interaction.options.getBoolean("bedrock");

  const data = await pingMC(ip, port, bedrock);

  let status;
  let players;
  let icon;
  let motd;
  let version;
  let attachment;

  if (data.online) {
    status = TEXTS.SERVER_ONLINE;
    players = `${data.players.online}/${data.players.max}`;
    version = data.version.name_raw;
  } else {
    status = TEXTS.SERVER_OFFLINE;
    version = "N/A";
    players = "N/A";
  }

  const color = data.online ? "#679137" : "#f44336";

  try {
    motd = data.motd.clean;
  } catch (error) {
    motd = "No Description";
  }

  try {
    attachment = new AttachmentBuilder(
      Buffer.from(data.icon.substr("data:image/png;base64,".length), "base64"),
      {
        name: "thumbnail.png",
      }
    );
    icon = "attachment://thumbnail.png";
  } catch (error) {
    icon = "https://i.imgur.com/4qKWXnq.png";
  }

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(status)
    .setDescription(motd)
    .setFooter({ text: data.host })
    .setThumbnail(icon)
    .addFields(
      { name: "Players", value: players },
      { name: "Version", value: version }
    )
    .setTimestamp();

  await interaction.deleteReply();

  if (attachment) {
    await interaction.channel.send({
      embeds: [embed],
      files: [attachment],
    });
  } else {
    await interaction.channel.send({
      embeds: [embed],
    });
  }

  logger.info(
    `(${interaction.guild.name}) @${interaction.user.username} pinged ${ip}:${port}`
  );
}

module.exports = pingServer;
