const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'mute',
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute un membre (timeout)')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre à mute')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duree')
        .setDescription('Durée en minutes')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison du mute')
        .setRequired(false)),
  
  async execute(interaction) {

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({
        content: "Tu n'as pas la permission de mute des membres.",
        ephemeral: true
      });
    }

    const target = interaction.options.getMember('membre');
    const minutes = interaction.options.getInteger('duree');
    const reason = interaction.options.getString('raison') || "Aucune raison fournie";

    if (!target) return interaction.reply({ content: "Membre introuvable.", ephemeral: true });
    if (target.id === interaction.user.id)
      return interaction.reply({ content: "Tu ne peux pas te mute toi-même.", ephemeral: true });

    const durationMs = minutes * 60 * 1000;

    try {
      await target.timeout(durationMs, reason);
      interaction.reply(`🔇 ${target.user.tag} a été mute pendant **${minutes} minute(s)**.\nRaison : ${reason}`);
    } catch (err) {
      interaction.reply({ content: "Impossible de mute ce membre.", ephemeral: true });
    }
  }
};
