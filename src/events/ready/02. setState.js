const { ActivityType, Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
    client.user.setPresence({
        activities: [
            {
                name: "the world burn 🔥",
                type: ActivityType.Watching,
            },
        ],
        status: "dnd",
    });
};
