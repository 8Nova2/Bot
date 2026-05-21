const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'kick',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.reply('Tu n\'as pas la permission de kicker des membres.');
    }

    const memberMention = message.mentions.members.first();
    if (!memberMention) return message.reply('Mentionne un membre à expulser.');

    if (!memberMention.kickable) return message.reply('Je ne peux pas expulser ce membre.');

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

    await memberMention.kick(reason);

    return message.channel.send(`${memberMention.user.tag} a été expulsé.\nRaison : ${reason}`);
  },
};
