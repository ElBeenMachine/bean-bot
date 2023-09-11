const { Client } = require("discord.js");
const getAllFiles = require("../utils/getAllFiles");
const path = require("path");

/**
 *
 * @param {Client} client
 */
function eventHandler(client) {
    const categoryFolders = getAllFiles(
        path.join(__dirname, "..", "events"),
        true
    );

    for (const categoryFolder of categoryFolders) {
        const eventFolders = getAllFiles(path.join(categoryFolder), true);
        for (const eventFolder of eventFolders) {
            const events = getAllFiles(eventFolder);
            for (const event of events) {
                require(event);
            }
        }
    }
}

module.exports = eventHandler;
