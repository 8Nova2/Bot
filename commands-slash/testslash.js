const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testslash')
    .setDescription('Commande slash de test'),
  async execute(interaction) {
    await interaction.reply('ENFINNNNN 1H que je suis dessus');
  }
};
