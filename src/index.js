require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");

const eventHandler = require("./handlers/eventHandler");
const mongoose = require("mongoose");

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

(async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_URI);
        console.log(`🟢 | Connection established with the database`);

        // Event handler
        eventHandler(client);
    } catch (error) {
        console.log(
            `🔴 | Unable to connect to a database using the provided URI: ${error}`
        );
        process.exit(1);
    }
})();

// Log in to Discord
client.login(process.env.BOT_TOKEN);
