const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
    console.log(`🟢 | Client logged in as ${client.user.username}`);
};
