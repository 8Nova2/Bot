const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require('./config.json');
const readline = require("readline");



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages

  ],
    partials: [Partials.Channel]
});

// Gestion des MP

client.on("messageCreate", async (message) => {
    if (message.author.bot) return; // Ignore les bots

    // Vérifier si c'est un message privé
    if (message.channel.type === 1) { // 1 = DM
        console.log("📩 MP reçu !");
        console.log("De :", message.author.tag);
        console.log("Contenu :", message.content);

        // Répondre au MP
        await message.reply("ok <:pepegros:1458804014756921555>");
    }
});


// Maps séparées pour slash et message commands
client.slashCommands = new Map();
client.messageCommands = new Map();

// ---------------------------
//      CHARGEMENT COMMANDES SLASH
// ---------------------------
const slashCommandsPath = path.join(__dirname, 'commands-slash');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
  const command = require(path.join(slashCommandsPath, file));

  if (!command.data || !command.execute) {
    console.log(`❌ Commande slash invalide : ${file}`);
    continue;
  }

  client.slashCommands.set(command.data.name, command);
  console.log(`Commande slash chargée : ${command.data.name}`);
}

// ---------------------------
//      CHARGEMENT COMMANDES MESSAGE
// ---------------------------
const messageCommandsPath = path.join(__dirname, 'commands-message');
if (fs.existsSync(messageCommandsPath)) {
  const messageCommandFiles = fs.readdirSync(messageCommandsPath).filter(file => file.endsWith('.js'));

  for (const file of messageCommandFiles) {
    const command = require(path.join(messageCommandsPath, file));

    if (!command.name || !command.execute) {
      console.log(`❌ Commande message invalide : ${file}`);
      continue;
    }

    client.messageCommands.set(command.name, command);
    console.log(`Commande message chargée : ${command.name}`);
  }
}

// ---------------------------
//      CHARGEMENT EVENTS
// ---------------------------
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));

  if (!event.name || !event.execute) {
    console.log(`❌ Event invalide : ${file}`);
    continue;
  }

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }

  console.log(`Event chargé : ${event.name}`);
}

client.login(config.token);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("🟢 Console prête.");
console.log("➡ Utilise : mp <ID_UTILISATEUR> <message>");

rl.on("line", async (input) => {
    const args = input.split(" ");

    const command = args.shift();

    if (command === "mp") {
        const userId = args.shift();
        const message = args.join(" ");

        if (!userId || !message) {
            console.log("❌ Usage: mp <ID_UTILISATEUR> <message>");
            return;
        }

        try {
            const user = await client.users.fetch(userId);
            await user.send(message);
            console.log(`✅ MP envoyé à ${user.tag}`);
        } catch (err) {
            console.log("❌ Impossible d’envoyer le MP :", err.message);
        }
    }
});

