const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setautorole")
        .setDescription("Définir le rôle automatiquement donné aux nouveaux membres.")
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("Le rôle à attribuer automatiquement.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const role = interaction.options.getRole("role");

        const logsPath = path.join(__dirname, "..", "logs", "autorolelogs.json");
        let logsData = JSON.parse(fs.readFileSync(logsPath, "utf8"));

        if (!logsData[interaction.guild.id]) {
            logsData[interaction.guild.id] = {};
        }

        logsData[interaction.guild.id].autorole = role.id;

        fs.writeFileSync(logsPath, JSON.stringify(logsData, null, 4));

        return interaction.reply({
            content: `✅ Le rôle **${role.name}** sera maintenant attribué automatiquement aux nouveaux membres.`,
            flags: 64
        });
    }
};