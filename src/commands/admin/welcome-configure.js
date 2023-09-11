const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "welcome-configure",
    description: "Set up welcome messages on your server",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "channel",
            description:
                "The channel that you would like welcome messages to be sent to.",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    botPermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            throw new Error("This command can only be run inside of a server");
        }

        const targetChannelID = interaction.options.get("channel").value;

        let welcomeChannel = await WelcomeChannel.findOne({
            guildID: interaction.guild.id,
        });

        if (welcomeChannel) {
            if (welcomeChannel.channelID === targetChannelID) {
                throw new Error(
                    "Welcome messages are already being sent to this channel. To disable welcome messages, run `/welcome-disable`"
                );
            }

            welcomeChannel.channelID = targetChannelID;
        } else {
            welcomeChannel = new WelcomeChannel({
                guildID: interaction.guild.id,
                channelID: targetChannelID,
            });
        }

        await welcomeChannel.save();

        const successEmbed = new Embed(client, {
            title: "Success",
            description: `Welcome messages have now been configured to be sent to <#${welcomeChannel.channelID}>. To disable welcome messages, run \`/welcome-disable\``,
            color: 0xfff900,
        });

        await interaction.editReply({ embeds: [successEmbed] });
    },
};
