const { ActivityType } = require("discord.js");
const client = require("../../../index");

client.on(__dirname.replace(/\\/g, "/").split("/").pop(), () => {
    client.user.setPresence({
        activities: [
            {
                name: "the world burn 🔥",
                type: ActivityType.Watching,
            },
        ],
    });
});
