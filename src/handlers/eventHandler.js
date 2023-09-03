const { Client } = require("discord.js");
const getAllFiles = require("../utils/getAllFiles");
const path = require("path");

/**
 *
 * @param {Client} client
 */
function eventHandler(client) {
    const eventFolders = getAllFiles(
        path.join(__dirname, "..", "events"),
        true
    );

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);

        const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                try {
                    await eventFunction(client, arg);
                } catch (error) {
                    console.log(
                        `🔴 | An error occurred while executing an event: ${error}`
                    );
                    continue;
                }
            }
        });
    }
}

module.exports = eventHandler;
