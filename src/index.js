require("dotenv").config();
const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");

// Define the client
const client = new Client({
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ],
});

// Create Collections
client.slash_commands = new Collection();
client.events = new Collection();

// Export client if required
module.exports = client;

// Log in to Discord
client
    .login(process.env.BOT_TOKEN)
    .then(() => {
        console.log(`Client logged in as ${client.user.username}`);
        client.user.setActivity("Visual Studio Code");
    })
    .catch((err) => console.log(err));
