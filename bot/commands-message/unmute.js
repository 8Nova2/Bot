const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'unmute',
  async execute(message, args) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("Tu n'as pas la permission de unmute des membres.");
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply("Mentionne un membre à unmute.");

    const reason = args.slice(1).join(" ") || "Aucune raison fournie";

    try {
      await target.timeout(null, reason);
      message.channel.send(`🔊 ${target.user.tag} a été unmute.`);
    } catch (err) {
      message.reply("Impossible de unmute ce membre.");
    }
  }
};
