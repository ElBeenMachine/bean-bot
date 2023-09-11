const { GuildMember, Client } = require("discord.js");
const WelcomeChannel = require("../../../models/WelcomeChannel");
const Welcomer = require("../../../structures/Welcomer");
const WelcomeImage = require("../../../models/WelcomeImage");
const validateImage = require("../../../utils/web/validateImage");
const client = require("../../../index");

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
client.on(__dirname.split("\\").pop(), async (member) => {
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
            .setAvatar(member.user.displayAvatarURL({ extension: "png" }))
            .setName(member.user.displayName)
            .setMemberCount(zeroPad(guild.memberCount, 3))
            .setBlur(2);

        const customBackground = await WelcomeImage.findOne({
            guildID: guild.id,
        });

        if (customBackground) {
            if (await validateImage(customBackground?.imageURL)) {
                image.setBackground(customBackground.imageURL);
            }
        }

        await targetChannel.send({
            content: `Welcome to the server, ${member}!`,
            files: [await image.generate()],
        });
    } catch (error) {
        throw error;
    }
});
