const fs = require("fs");
const path = require("path");

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {
        const logsPath = path.join(__dirname, "..", "logs", "logs.json");
        let logsData;

        try {
            logsData = JSON.parse(fs.readFileSync(logsPath, "utf8"));
        } catch (err) {
            console.error("❌ Erreur lecture logs.json :", err);
            return;
        }

        if (!logsData[member.guild.id]) return;

        const guildConfig = logsData[member.guild.id];

        // ===========================
        // 🔹 AUTOROLE
        // ===========================
        if (guildConfig.autorole) {
            const role = member.guild.roles.cache.get(guildConfig.autorole);

            if (role) {
                member.roles.add(role).catch(err => {
                    console.error("❌ Impossible de donner le rôle autorole :", err);
                });

                // envoyer un message si un channel de log est défini
                if (guildConfig.member) {
                    const logChannel = member.guild.channels.cache.get(guildConfig.member);
                    if (logChannel) {
                        logChannel.send({
                            embeds: [{
                                title: "👤 Nouveau membre",
                                description: `**${member.user.tag}** vient d'arriver !\nRôle attribué automatiquement : <@&${role.id}>`,
                                color: 0x2ecc71,
                                timestamp: new Date()
                            }]
                        }).catch(err => console.error("❌ Erreur en envoyant le log autorole :", err));
                    }
                }
            }
        }

        // ===========================
        // 🔹 LOG JOIN (évite double log)
        // ===========================

        if (guildConfig.member) {
            const logChannel = member.guild.channels.cache.get(guildConfig.member);
            if (logChannel) {
                logChannel.send({
                    embeds: [{
                        title: "👋 Nouveau membre",
                        description: `${member.user.tag} vient de rejoindre le serveur !`,
                        color: 0x3498db,
                        timestamp: new Date()
                    }]
                }).catch(err => console.error("❌ Erreur en envoyant le log join :", err));
            }
        }
    }
};
