const logger = require("../utils/logger");

const fs = require("fs");
const path = require("path");

const { EmbedBuilder } = require("discord.js");

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

  const embed = new EmbedBuilder()
    .setColor("#679137")
    .setTitle("Ping")
    .setDescription(`Pinged ${ip}:${port}`)
    .setThumbnail("https://i.imgur.com/4qKWXnq.png")
    .setTimestamp();

  await interaction.editReply({
    embeds: [embed],
  });

  logger.info(
    `(${interaction.guild.name}) @${interaction.user.username} pinged ${ip}:${port}`
  );
}

module.exports = pingServer;
