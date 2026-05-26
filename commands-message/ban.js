const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'ban',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply('Tu n\'as pas la permission de bannir des membres.');
    }

    const memberMention = message.mentions.members.first();
    if (!memberMention) return message.reply('Mentionne un membre à bannir.');

    if (!memberMention.bannable) return message.reply('Je ne peux pas bannir ce membre.');

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

    await memberMention.ban({ reason });

    return message.channel.send(`${memberMention.user.tag} a été banni.\nRaison : ${reason}`);
  },
};
