const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  statusChannelId: {
    type: String,
    required: true,
  },
  playersChannelId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  bedrock: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Guilds", guildSchema);
