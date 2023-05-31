const { Embed } = require("../../utils/Embeds");
const MusicChannelCheck = require("../../utils/MusicChannelCheck");

const name = "clear";

module.exports = {
    name,
    description: "Clear the song queue",
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
            await queue.tracks.clear()
            await interaction.editReply({
                embeds: [
                    new Embed(interaction)
                        .setColor("Purple")
                        .setAuthor({ name: "Clear", iconURL: client.user.displayAvatarURL() })
                        .addFields([
                            {
                                name: "Done",
                                value: "The queue has been successfully cleared",
                                inline: true
                            },
                            {
                                name: "Cleared By",
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