const logger = require("../utils/logger");
const searchUUID = require("../utils/searchUUID.js");

const fs = require("fs");
const path = require("path");

const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

async function skinSearch(interaction) {
  // Localize TEXTS
  const langPath = path.resolve(__dirname, `../lang/${interaction.locale}.js`);

  let TEXTS;
  if (fs.existsSync(langPath)) {
    TEXTS = require(`../lang/${interaction.locale}.js`);
  } else {
    TEXTS = require(`../lang/en-US.js`);
  }

  const name = interaction.options.getString("name");

  const uuid = await searchUUID(name);

  if (!uuid) {
    await interaction.editReply({
      content: TEXTS.INVALID_USERNAME + name + "'",
      ephemeral: true,
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setColor("#9b59b6")
    .setTitle(`Skin of ${name}`)
    .setDescription(uuid)
    .setThumbnail(`https://api.mineatar.io/face/${uuid}?scale=10`);

  const mineatar = new ButtonBuilder()
    .setLabel("View Raw Skin")
    .setURL(`https://api.mineatar.io/skin/${uuid}`)
    .setStyle(ButtonStyle.Link);

  const row = new ActionRowBuilder().addComponents(mineatar);

  await interaction.deleteReply();

  await interaction.channel.send({
    embeds: [embed],
    components: [row],
  });

  logger.info(
    `(${interaction.guild.name}) @${interaction.user.username} searched for skin: ${name}`
  );
}

module.exports = skinSearch;
