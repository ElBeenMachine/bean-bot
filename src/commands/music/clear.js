const { Client, Interaction } = require("discord.js");
const MusicChannelCheck = require("../../utils/checks/MusicChannelCheck");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "clear",
    description: "Clear the song queue",
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
        await MusicChannelCheck(interaction);

        const queue = client.player.nodes.get(interaction.guild.id);
        if (!queue) throw new Error("No Queue");

        // Clear the queue
        await queue.tracks.clear();

        const successEmbed = new Embed(client, {
            title: "Queue Cleared",
            description:
                "The queue has now been cleared. To add more songs to the queue, use `/play`",
        });

        await interaction.editReply({
            embeds: [successEmbed],
        });
    },
};
