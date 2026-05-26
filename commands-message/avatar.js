module.exports = {

    name: "avatar",
    description: "test de user infos, etape 1 avatar",

    execute(message,args) {
        const user = message.mentions.users.first() || message.author;

        const embed = {
            color: 0x00ffff,
            title: `Avatar de ${user.username}`,
            image: {
                url: user.displayAvatarURL({ dynamic: true, size: 512 }),
    }
}

        message.channel.send({ embeds: [embed] });
}
}