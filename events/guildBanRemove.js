const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const logsFile = path.join(__dirname, "..", "logs", "logs.json");

module.exports = {
  name: "guildBanRemove",

  async execute(ban) {
    if (!fs.existsSync(logsFile)) return;
    const logs = JSON.parse(fs.readFileSync(logsFile, "utf8"));
    const guildLogs = logs[ban.guild.id];

    if (!guildLogs || !guildLogs.logs_mod) return;
    const channel = ban.guild.channels.cache.get(guildLogs.logs_mod);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("♻️ Membre débanni")
      .setColor("Green")
      .setDescription(`> 👤 **Utilisateur :** ${ban.user.tag}\n> 🆔 **ID :** ${ban.user.id}`)
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
