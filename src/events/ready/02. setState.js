const { ActivityType } = require("discord.js");

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
