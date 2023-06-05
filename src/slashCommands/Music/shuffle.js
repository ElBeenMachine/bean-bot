const { Embed } = require("../../utils/Embeds");
const MusicChannelCheck = require("../../utils/MusicChannelCheck");

const name = "shuffle";

module.exports = {
    name,
    description: "Shufffle the song queue",
    type: 1,
    permissions: {
        DEFUALT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {
        await interaction.deferReply();
        await MusicChannelCheck(interaction);

        const queue = client.player.nodes.get(interaction.guild.id);
        if(!queue) throw new Error("No Queue");

        try {
            // Clear the queue
            await queue.tracks.shuffle()
            await interaction.editReply({
                embeds: [
                    new Embed(interaction)
                        .setColor("Orange")
                        .setAuthor({ name: "Shuffle", iconURL: client.user.displayAvatarURL() })
                        .addFields([
                            {
                                name: "Done",
                                value: "The queue has been successfully shuffled",
                                inline: true
                            },
                            {
                                name: "Shuffled By",
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