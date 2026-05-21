module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Bot connecté en tant que ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: "Fais rager Nova", type: 5 }],
            status: "online"
        });
    }
};
