require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Partials,
    ActivityType,
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
    presence: {
        activities: [
            {
                name: "the world burn 🔥",
                type: ActivityType.Watching,
            },
        ],
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
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

// Define the player
const { Player } = require("discord-player");

client.player = new Player(client);
client.player.extractors.loadDefault();

module.exports = client;

// Fix YTDL error with extractors
process.env.DP_FORCE_YTDL_MOD = "@distube/ytdl-core";

(async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_URI);
        console.log(`🟢 | Connection established with the database`);
    } catch (error) {
        console.log(
            `🔴 | Unable to connect to a database using the provided URI: ${error}`
        );
        process.exit(1);
    }

    // Event handler
    eventHandler(client);
})();

// Log in to Discord
client.login(process.env.BOT_TOKEN);
