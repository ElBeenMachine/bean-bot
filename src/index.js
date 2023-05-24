const { 
    Client, 
    Partials, 
    Collection, 
    GatewayIntentBits 
} = require('discord.js');

require("dotenv").config();

const logger = require("./utils/logger");

const start = async () => {
    const client = new Client({
        shards: "auto",
        allowedMentions: {
            parse: ["roles", "users", "everyone"],
            repliedUser: false
        },
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent, 
            GatewayIntentBits.GuildVoiceStates
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.User,
            Partials.GuildMember,
            Partials.Reaction
        ],
        presence: {
            status: 'dnd'
        }
    });
    
    // Set the config file of the bot
    client.config = require("../config");
    
    // Create different collections
    client.slash_commands = new Collection();
    client.events = new Collection();
    
    module.exports = client;

    // Load events handler
    require("./handlers/eventHandler")(client);
    
    // Log In
    client.login(process.env.TOKEN).catch(err => {
        logger.error("[LOGIN] - An error has occurred while trying to log in. Exiting...")
        console.error(err);
        process.exit(0);
    });
    
    // Handle unhandled errors
    process.on("unhandledRejection", error => console.error(error));
    process.on("uncaughtException", error => console.error(error.stack));
}

// Start the bot
start();