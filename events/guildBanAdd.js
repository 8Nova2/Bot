const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const logsFile = path.join(__dirname, "..", "logs", "logs.json");

module.exports = {
  name: "guildBanAdd",

  async execute(ban) {
    if (!fs.existsSync(logsFile)) return;
    const logs = JSON.parse(fs.readFileSync(logsFile, "utf8"));

    const guildLogs = logs[ban.guild.id];
    if (!guildLogs || !guildLogs.logs_mod) return;

    const logChannel = ban.guild.channels.cache.get(guildLogs.logs_mod);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setTitle("🔨 Membre banni")
      .setColor("Red")
      .setDescription(`> **Utilisateur :** ${ban.user.tag}\n> **ID :** ${ban.user.id}`)
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  }
};
