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
        const userChannel = interaction.member.voice.channel;
        if(!userChannel) throw new Error("You must be in a voice channel to use this command.");

        const botChannel = interaction.guild.members.me.voice.channelId;

        if(botChannel && userChannel != botChannel) throw new Error("You must be in my voice channel to use this command.");

        const query = interaction.options.getString("query");

        await interaction.reply("No");

        try {
            await client.player.play(userChannel, query, {
                nodeOptions: {
                    leaveOnEmpty: false,
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
};