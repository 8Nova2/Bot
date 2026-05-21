module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Bot connecté en tant que ${client.user.tag}`);

        const activities = [
            { name: "Hébergé 24/24", type: 5 },
            { name: "fais rager Nova", type: 3 },
        ];
        let index = 0;

        setInterval(() => {
            client.user.setPresence({
                activities: [{ name: activities[index].name, type: activities[index].type }],
                status: "online"
            });
            index = (index + 1) % activities.length;
        }, 15000);
    }
};   