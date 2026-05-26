const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require('discord.js');

const cooldown = new Map();
const COOLDOWN_TIME = 10 * 1000; // 10 secondes

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription("📯 • Parle sous l'identité du bot.")
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('Le message à envoyer.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const now = Date.now();

    if (cooldown.has(userId)) {
      const expiration = cooldown.get(userId) + COOLDOWN_TIME;

      if (now < expiration) {
        const remaining = Math.ceil((expiration - now) / 1000);
        return interaction.reply({
          content: `⏳ • Patiente encore **${remaining}s** avant de réutiliser la commande.`,
          ephemeral: true
        });
      }
    }

    cooldown.set(userId, now);
    setTimeout(() => cooldown.delete(userId), COOLDOWN_TIME);

    const message = interaction.options.getString('message');

    const isAdmin = interaction.member.permissions.has(
      PermissionFlagsBits.Administrator
    );

    await interaction.reply({
      content: message,
      allowedMentions: isAdmin
        ? { parse: ['users', 'roles', 'everyone'] } // 👑 admin
        : { parse: [] } // 👤 non-admin (0 ping XD)
    });
  }
};
