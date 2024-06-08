const { SlashCommandBuilder } = require("discord.js");

const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping your Minecraft server.")
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

    const ip = interaction.options.getString("ip");
    const port = interaction.options.getInteger("port");
    const bedrock = interaction.options.getBoolean("bedrock");

    logger.info(
      `(${interaction.guild.name}) @${interaction.user.username} pinged ${ip}:${port}`
    );

    await interaction.reply(`Pinging ${ip}:${port}`);
  },
};
