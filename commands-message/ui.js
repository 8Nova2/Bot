module.exports = {
    name: "ui",
    description: "premier essaie de ui",

    execute(message,args) {
        const user = message.mentions.users.first() || message.author;
        console.log(message.author,user)
        
        const embed = {
            color: 0x00ffff,
            title: (`information sur ${user.tag}`), 
            thumbnail: {
                url: user.displayAvatarURL({ dynamic: true, size: 256 }),
    },
            fields: [
                { name: "Username", value: `${user.tag}`, inline: true },
                { name: "ID", value: `${user.id}`, inline: true },
                { name: "Date de création", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false},
                { name: "Roles", value: `${user.roles}`, inline: true },
            ],
            
        }
            message.channel.send({ embeds: [embed] });

    }    
}