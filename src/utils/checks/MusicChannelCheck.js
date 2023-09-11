module.exports = async (interaction) => {
    const userChannel = interaction.member.voice.channel;
    if (!userChannel)
        throw new Error("You must be in a voice channel to use this command.");

    const botChannel = interaction.guild.members.me.voice.channelId;

    if (botChannel && userChannel != botChannel)
        throw new Error("You must be in my voice channel to use this command.");
};
