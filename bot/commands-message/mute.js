const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'mute',
  async execute(message, args) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("Tu n'as pas la permission de mute des membres.");
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply("Mentionne un membre à mute.");

    const minutes = parseInt(args[1]);
    if (isNaN(minutes)) return message.reply("Donne une durée en minutes.");

    const reason = args.slice(2).join(" ") || "Aucune raison fournie";
    const durationMs = minutes * 60000;

    try {
      await target.timeout(durationMs, reason);
      message.channel.send(`🔇 ${target.user.tag} mute pendant **${minutes} minute(s)**.`);
    } catch (err) {
      message.reply("Impossible de mute ce membre.");
    }
  }
};