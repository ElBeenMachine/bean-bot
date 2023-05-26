const client = require("../index");
const { ActivityType } = require("discord.js");

module.exports = () => {
    // Default type is Playing. Use ENV variable to set otherwise
    let type;
    switch (process.env.BOT_STATUS_TYPE) {
        case "WATCHING":
            type = ActivityType.Watching;
            break;

        case "LISTENING":
            type = ActivityType.Listening;
            break;

        case "PLAYING":
            type = ActivityType.Playing;
            break;

        case "STREAMING":
            type = ActivityType.Streaming;
            break;

        case "COMPETING":
            type = ActivityType.Competing;
            break;
    
        default:
            type = ActivityType.Playing;
            break;
    }

    // Set Bot Status
    client.user.setPresence({
        activities: [{ name: process.env.BOT_STATUS_STRING || "/help", type }],
        status: 'online',
    });
}