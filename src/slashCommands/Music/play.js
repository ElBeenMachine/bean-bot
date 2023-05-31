const { QueryType } = require("discord-player");
const { Embed } = require("../../utils/Embeds");
const MusicChannelCheck = require("../../utils/MusicChannelCheck");

const name = "play";

module.exports = {
    name,
    description: "Play a song",
    type: 1,
    options: [{
        name: 'query',
        type: 3,
        description: 'Song Title',
        required: true,
    }],
    permissions: {
        DEFUALT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {
        await interaction.deferReply();
        await MusicChannelCheck(interaction);

        const query = interaction.options.getString("query");
        const result = await client.player.search(query, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        }).catch(e => {
            throw e;
        });

        try {
            await client.player.play(interaction.member.voice.channel, result, {
                nodeOptions: {
                    leaveOnEmpty: false,
                    leaveOnEnd: true,
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            }).then(async song => {
                const { track } = song;
                await interaction.editReply({
                    embeds: [
                        new Embed(interaction)
                            .setTitle(result.playlist ? result.playlist.title : track.title)
                            .setURL(result.playlist ? result.playlist.url : track.url)
                            .setColor("Green")
                            .setAuthor({ name: result.playlist ? `${result.playlist.tracks.length} Songs Added to queue` : `Song Added to queue` })
                            .setFooter({ text: `${result.playlist ? "Songs" : "Song"} Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                    ]
                });
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
};