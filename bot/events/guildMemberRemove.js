const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const logsFile = path.join(__dirname, "..", "logs", "logs.json");

module.exports = {
  name: "guildMemberRemove",

  async execute(member) {
    if (!fs.existsSync(logsFile)) return;
    const logs = JSON.parse(fs.readFileSync(logsFile, "utf8"));
    const guildLogs = logs[member.guild.id];

    if (!guildLogs || !guildLogs.logs_member) return;
    const channel = member.guild.channels.cache.get(guildLogs.logs_member);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("📤 Membre parti")
      .setColor("Orange")
      .setDescription(`> 👋 **${member.user.tag}** a quitté le serveur.`)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
