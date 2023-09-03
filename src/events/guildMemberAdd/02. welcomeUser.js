const { GuildMember, Client, AttachmentBuilder } = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");
const Welcomer = require("../../structures/Welcomer");

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
    try {
        let guild = member.guild;
        if (!guild) return;

        const welcomeChannel = await WelcomeChannel.findOne({
            guildID: guild.id,
        });

        if (!welcomeChannel) return;

        const targetChannel = client.channels.cache.get(
            welcomeChannel.channelID
        );

        const zeroPad = (num, places) => String(num).padStart(places, "0");

        const image = new Welcomer()
            .setBackground(
                "https://i.pinimg.com/736x/26/87/df/2687df3e5a5b1b8a5f95be66e4b87571.jpg"
            )
            .setAvatar(member.user.displayAvatarURL({ extension: "png" }))
            .setName(member.user.displayName)
            .setMemberCount(zeroPad(guild.memberCount, 3))
            .setBlur(2);

        await targetChannel.send({
            content: `Welcome to the server, ${member}!`,
            files: [await image.generate()],
        });
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
};
