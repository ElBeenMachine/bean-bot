const { Embed } = require("../../utils/Embeds");

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
        const userChannel = interaction.member.voice.channel;
        if(!userChannel) throw new Error("You must be in a voice channel to use this command.");

        const botChannel = interaction.guild.members.me.voice.channelId;

        if(botChannel && userChannel != botChannel) throw new Error("You must be in my voice channel to use this command.");

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