const { GuildMember, Client, AttachmentBuilder } = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");
const { Welcomer } = require("canvacord");

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

        const welcomeCard = new Welcomer()
            .setAvatar(
                member.user.displayAvatarURL({ dynamic: false, format: "png" })
            )
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator)
            .setGuildName(member.guild.name)
            .setMemberCount(member.guild.memberCount + 1)
            .setBackground(
                "https://media.istockphoto.com/id/1040600470/photo/futuristic-sci-fi-modern-empty-stage-reflective-concrete-room-with-purple-and-blue-glowing.jpg?s=170667a&w=0&k=20&c=1ouOfKQBWbmW2LOJ3PY0sd41XW2anfOjaiIO-cae8qs="
            );

        const data = await welcomeCard.build();

        await targetChannel.send({
            content: `Welcome to the server, ${member}!`,
            files: [data],
        });
    } catch (error) {
        throw error;
    }
};
