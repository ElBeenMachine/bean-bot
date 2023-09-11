const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
} = require("discord.js");
const { QueryType } = require("discord-player");
const MusicChannelCheck = require("../../utils/checks/MusicChannelCheck");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "play",
    description: "Play a song or playlist",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "query",
            description: "The search query",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [],
    botPermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        await MusicChannelCheck(interaction);
        const query = interaction.options.get("query").value;

        const results = await client.player.search(query, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO,
        });

        await client.player
            .play(interaction.member.voice.channel, results, {
                nodeOptions: {
                    leaveOnEmpty: false,
                    leaveOnEnd: true,
                    metadata: interaction,
                },
            })
            .then(async (song) => {
                const { track } = song;
                const successEmbed = new Embed(client, {
                    title: results.playlist
                        ? `${results.playlist.title} | Playlist by ${results.playlist.author.name}`
                        : `${track.title} by ${track.author}`,
                });
                successEmbed
                    .setURL(results.playlist ? results.playlist.url : track.url)
                    .setAuthor({
                        name: results.playlist
                            ? `${results.playlist.tracks.length} Songs Added to queue`
                            : `Song Added to queue`,
                    })
                    .setThumbnail(
                        results.playlist
                            ? results.playlist.thumbnail
                            : track.thumbnail
                    );
                await interaction.editReply({ embeds: [successEmbed] });
            });
    },
};
