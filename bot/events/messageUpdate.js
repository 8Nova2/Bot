const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const logsFile = path.join(__dirname, "..", "logs", "logs.json");

module.exports = {
  name: "messageUpdate",

  async execute(oldMsg, newMsg) {
    if (!newMsg.guild || newMsg.author?.bot) return;
    if (oldMsg.content === newMsg.content) return;

    if (!fs.existsSync(logsFile)) return;
    const logs = JSON.parse(fs.readFileSync(logsFile, "utf8"));
    const guildLogs = logs[newMsg.guild.id];

    if (!guildLogs || !guildLogs.logs_message) return;
    const channel = newMsg.guild.channels.cache.get(guildLogs.logs_message);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("✏️ Message modifié")
      .setColor("Yellow")
      .addFields(
        { name: "Auteur", value: `${newMsg.author.tag}` },
        { name: "Ancien", value: oldMsg.content || "*Vide*" },
        { name: "Nouveau", value: newMsg.content || "*Vide*" },
        { name: "Salon", value: `${newMsg.channel}` }
      )
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
