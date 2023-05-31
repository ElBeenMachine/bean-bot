const { Embed } = require("../../utils/Embeds");
const MusicChannelCheck = require("../../utils/MusicChannelCheck");

const name = "skip";

module.exports = {
    name,
    description: "Skip the current song",
    type: 1,
    permissions: {
        DEFUALT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {
        await interaction.deferReply();
        await MusicChannelCheck(interaction);

        const queue = client.player.nodes.get(interaction.guild.id);
        const track = queue.currentTrack;

        try {
            // Skip the current song
            await queue.node.skip();
            await interaction.editReply({
                embeds: [
                    new Embed(interaction)
                        .setColor("Purple")
                        .setAuthor({ name: "Song Skipped", iconURL: client.user.displayAvatarURL() })
                        .setTitle(`${track.title}`)
                        .setURL(track.url)
                        .setThumbnail(track.thumbnail)
                        .addFields([
                            {
                                name: "Artist",
                                value: track.author,
                                inline: true
                            },
                            {
                                name: "Skipped By",
                                value: interaction.user.username
                            }
                        ])
                ]
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
};