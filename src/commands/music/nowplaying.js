const { Client, Interaction } = require("discord.js");
const MusicChannelCheck = require("../../utils/checks/MusicChannelCheck");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "nowplaying",
    description: "Get information on the currently playing song",
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

        const successEmbed = new Embed(client, {
            title: "Now Playing",
        });

        successEmbed.addFields([
            {
                name: "Song Title",
                value: track.title,
            },
            {
                name: "Artist",
                value: track.author,
            },
        ]);

        successEmbed.setURL(track.url);
        successEmbed.setThumbnail(track.thumbnail);

        await interaction.editReply({
            embeds: [successEmbed],
        });
    },
};
