require("dotenv").config();
const dbTest = require("./utils/database/dbTest");

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
} = require("discord.js");

// Test Connection to the database
if (dbTest()) {
    console.log(`🟢 | Database connection established`);
} else {
    console.log(
        `🔴 | Unable to connect to a database using the connection string provided.`
    );
    throw Error(
        "Unable to connect to a database using the connection string provided."
    );
}

const eventHandler = require("./handlers/eventHandler");

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

// Event handler
eventHandler(client);

// Log in to Discord
client
    .login(process.env.BOT_TOKEN)
    .catch((err) => console.log(`🔴 | An error has occurred: ${err}`));
