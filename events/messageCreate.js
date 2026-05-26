const { prefix } = require("../config.json");
const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

const filePath = path.join(__dirname, "../logs/mp_logs.json");

// 🔹 ID du salon où les MP doivent être envoyés
const LOG_CHANNEL_ID = "1446131793781719210";

module.exports = {
    name: "messageCreate",
    async execute(message, client) {

        if (message.author.bot) return;

        // ----------------------------------------
        // 📩 ENREGISTREMENT DES MP (DM)
        // ----------------------------------------
        if (message.channel.isDMBased()) {
            try {
                // --- Stockage JSON ---
                let data = [];

                if (fs.existsSync(filePath)) {
                    const raw = fs.readFileSync(filePath, "utf8");
                    if (raw.trim() !== "") {
                        data = JSON.parse(raw);
                    }
                }

                data.push({
                    user: message.author.tag,
                    userId: message.author.id,
                    content: message.content,
                    date: new Date().toISOString()
                });

                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
                console.log("📩 MP sauvegardé dans logs/mp_logs.json");

                // --- Envoi dans le salon en embed ---
                const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);
                if (logChannel && logChannel.isTextBased()) {

                    const embed = new EmbedBuilder()
                        .setTitle("📩 Nouveau MP reçu")
                        .setColor("Blue")
                        .addFields(
                            { name: "Utilisateur", value: `${message.author.tag}`, inline: true },
                            { name: "ID", value: `${message.author.id}`, inline: true },
                            { name: "Date", value: `${new Date().toLocaleString()}`, inline: false },
                            { name: "Message", value: message.content || "*(vide)*" }
                        )
                        .setFooter({ text: "Omega Bot - Support" });

                    await logChannel.send({ embeds: [embed] });
                }

            } catch (err) {
                console.error("❌ Erreur lors de l'enregistrement/envoi du MP :", err);
            }

            return; // on ne traite pas les commandes en DM
        }

        // ----------------------------------------
        // 💬 RÉPONSE AU PING DU BOT
        // ----------------------------------------
        if (message.mentions.has(client.user) && !message.content.startsWith(prefix)) {
            return message.reply("Salut ! Tu m'as appelé ? 👋");
        }

        // ----------------------------------------
        // 🔧 GESTION DES COMMANDES
        // ----------------------------------------
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();

        const command = client.messageCommands.get(cmdName);
        if (!command) return;

        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply("Une erreur est survenue lors de l'exécution de la commande.");
        }
    }
};
