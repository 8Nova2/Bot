module.exports = {
    name: "test2",
    description: "Ajoute un rôle via ID / mention / nom",

    async execute(message, args) {

        // Vérifie les arguments
        if (!args[0]) {
            return message.reply("❌ | Merci d’indiquer un rôle : `§test <role>`");
        }

        // Cherche le rôle
        let role =
            message.mentions.roles.first() ||               // Mention
            message.guild.roles.cache.get(args[0]) ||        // ID
            message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase()); // Nom

        if (!role) {
            return message.reply("❌ | Rôle introuvable, vérifie l’ID / mention / nom.");
        }

        // Vérifie permissions
        if (!message.guild.members.me.permissions.has("ManageRoles")) {
            return message.reply("❌ | Je n’ai pas la permission **Gérer les rôles** !");
        }

        // Ajout du rôle
        try {
            await message.member.roles.add(role);
            message.reply(`✅ | Le rôle **${role.name}** t’a été ajouté !`);
        } catch (err) {
            console.error(err);
            message.reply("❌ | Je ne peux pas ajouter ce rôle (hiérarchie ou permissions).");
        }
    }
};
