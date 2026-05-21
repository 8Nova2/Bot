const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'unban',
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Débannir un utilisateur')
    .addStringOption(option =>
      option
        .setName('id')
        .setDescription('ID de l\'utilisateur à débannir')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('raison')
        .setDescription('Raison du débannissement')
        .setRequired(false)),
  
  async execute(interaction) {

    // Vérification des permissions
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({
        content: "Tu n'as pas la permission de débannir des membres.",
        ephemeral: true
      });
    }

    const userId = interaction.options.getString('id');
    const reason = interaction.options.getString('raison') || "Aucune raison fournie";

    try {
      // Vérifier si l'utilisateur est banni
      const banList = await interaction.guild.bans.fetch();
      const bannedUser = banList.get(userId);

      if (!bannedUser) {
        return interaction.reply({
          content: "Cet utilisateur n'est pas banni.",
          ephemeral: true
        });
      }

      // Déban
      await interaction.guild.members.unban(userId, reason);

      return interaction.reply(`Utilisateur **${bannedUser.user.tag}** débanni.\nRaison : ${reason}`);

    } catch (err) {
      return interaction.reply({
        content: "Impossible de débannir cet utilisateur. Vérifie l'ID.",
        ephemeral: true
      });
    }
  }
};
