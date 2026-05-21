module.exports = {
    name: 'say',
    description: 'Le bot répète ton message.',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send('Tu dois me dire ce que je dois dire !');
        }
        const text = args.join(' ');
        message.channel.send(text);
    },
};