const { Client, Interaction } = require("discord.js");
const MusicChannelCheck = require("../../utils/checks/MusicChannelCheck");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "skip",
    description: "Skip the current song",
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

        const track = queue.currentTrack;

        // Skip the song
        await queue.node.skip();

        const successEmbed = new Embed(client, {
            title: "Song Skipped",
            description: `${interaction.user} skipped ${track.title}`,
        });

        await interaction.editReply({
            embeds: [successEmbed],
        });
    },
};
