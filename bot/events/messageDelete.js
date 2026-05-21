const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const logsFile = path.join(__dirname, "..", "logs", "logs.json");

module.exports = {
  name: "messageDelete",

  async execute(message) {
    if (!message.guild || message.author?.bot) return;

    if (!fs.existsSync(logsFile)) return;
    const logs = JSON.parse(fs.readFileSync(logsFile, "utf8"));
    const guildLogs = logs[message.guild.id];

    if (!guildLogs || !guildLogs.logs_message) return;
    const channel = message.guild.channels.cache.get(guildLogs.logs_message);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("🗑️ Message supprimé")
      .setColor("Red")
      .addFields(
        { name: "Auteur", value: `${message.author.tag}` },
        { name: "Salon", value: `${message.channel}` },
        { name: "Contenu", value: message.content || "*Aucun texte*" }
      )
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
