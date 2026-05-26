const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulse un membre du serveur')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre à expulser')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison de l\'expulsion')
        .setRequired(false)),
  
  async execute(interaction) {
    // Permissions
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({ content: 'Tu n\'as pas la permission de kicker des membres.', ephemeral: true });
    }

    const member = interaction.options.getUser('membre');
    const reason = interaction.options.getString('raison') || 'Aucune raison fournie';

    // Fetch membre guild
    const guildMember = await interaction.guild.members.fetch(member.id).catch(() => null);
    if (!guildMember) return interaction.reply({ content: 'Membre introuvable sur ce serveur.', ephemeral: true });
    if (!guildMember.kickable) return interaction.reply({ content: 'Je ne peux pas expulser ce membre.', ephemeral: true });

    // Kick
    await guildMember.kick(reason);

    return interaction.reply(`Le membre ${member.tag} a été expulsé.\nRaison : ${reason}`);
  },
};
