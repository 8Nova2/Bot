const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mp")
        .setDescription("Envoyer un message privé à un utilisateur")
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("Utilisateur à qui envoyer le MP")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("message")
                .setDescription("Message à envoyer")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Sécurité

    async execute(interaction) {
        const user = interaction.options.getUser("utilisateur");
        const message = interaction.options.getString("message");

        try {
            await user.send(message);
            await interaction.reply({ 
                content: `✅ MP envoyé à **${user.tag}**`, 
                ephemeral: true 
            });
        } catch (err) {
            await interaction.reply({ 
                content: "❌ Impossible d’envoyer le MP (MP fermés ou utilisateur introuvable).", 
                ephemeral: true 
            });
        }
    }
};
