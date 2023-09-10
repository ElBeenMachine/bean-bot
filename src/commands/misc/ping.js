const { Client, Interaction } = require("discord.js");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "ping",
    description: "pong",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [],
    permissionsRequired: [],
    botPermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        const embed = new Embed(client, {
            title: "🏓 Pong!",
            description: `Pong! ${ping}ms | Websocket: ${client.ws.ping}ms`,
        });

        interaction.editReply({ embeds: [embed] });
    },
};
