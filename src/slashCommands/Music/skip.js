const { Embed } = require("../../utils/Embeds");

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
        const userChannel = interaction.member.voice.channel;
        if(!userChannel) throw new Error("You must be in a voice channel to use this command.");

        const botChannel = interaction.guild.members.me.voice.channelId;

        if(botChannel && userChannel != botChannel) throw new Error("You must be in my voice channel to use this command.");

        const queue = client.player.nodes.get(interaction.guild.id);

        try {
            // Skip the current song
            await queue.node.skip();
            await interaction.editReply({
                embeds: [
                    new Embed(interaction)
                        .setColor("Purple")
                        .setAuthor({ name: "Song Skipped" })
                        .setFooter(null)
                ]
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
};