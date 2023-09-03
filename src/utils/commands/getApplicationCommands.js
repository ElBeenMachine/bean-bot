const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {*} guildID
 * @returns
 */
async function getApplicationCommands(client, guildID) {
    let applicationCommands = [];

    if (guildID) {
        const guild = await client.guilds.fetch(guildID);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = await client.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;
}

module.exports = getApplicationCommands;
