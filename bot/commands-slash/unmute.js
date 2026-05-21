const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'unmute',
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute un membre')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre à unmute')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du unmute')
        .setRequired(false)),

  async execute(interaction) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({
        content: "Tu n'as pas la permission de unmute des membres.",
        ephemeral: true
      });
    }

    const target = interaction.options.getMember('membre');
    const reason = interaction.options.getString('raison') || "Aucune raison fournie";

    if (!target) return interaction.reply({ content: "Membre introuvable.", ephemeral: true });

    try {
      await target.timeout(null, reason);
      interaction.reply(`🔊 ${target.user.tag} a été unmute.\nRaison : ${reason}`);
    } catch (err) {
      interaction.reply({ content: "Impossible de unmute ce membre.", ephemeral: true });
    }
  }
};
