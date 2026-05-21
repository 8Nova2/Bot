const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'unban',
  async execute(message, args) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("Tu n'as pas la permission de débannir des membres.");
    }

    const userId = args[0];
    if (!userId) return message.reply("Tu dois fournir l'ID d'un utilisateur à débannir.");

    const reason = args.slice(1).join(" ") || "Aucune raison fournie";

    try {
      const bannedUser = await message.guild.bans.fetch(userId);

      await message.guild.members.unban(userId, reason);

      return message.channel.send(`Utilisateur **${bannedUser.user.tag}** débanni.\nRaison : ${reason}`);

    } catch (err) {
      return message.reply("Impossible de débannir cet utilisateur. Vérifie l'ID.");
    }
  }
};
