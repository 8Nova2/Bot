const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un membre du serveur')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre à bannir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du bannissement')
        .setRequired(false)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: 'Tu n\'as pas la permission de bannir des membres.', ephemeral: true });
    }

    const member = interaction.options.getUser('membre');
    const reason = interaction.options.getString('raison') || 'Aucune raison fournie';

    const guildMember = await interaction.guild.members.fetch(member.id).catch(() => null);
    if (!guildMember) return interaction.reply({ content: 'Membre introuvable sur ce serveur.', ephemeral: true });
    if (!guildMember.bannable) return interaction.reply({ content: 'Je ne peux pas bannir ce membre.', ephemeral: true });

    await guildMember.ban({ reason });

    return interaction.reply(`Le membre ${member.tag} a été banni.\nRaison : ${reason}`);
  },
};
