const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");

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
            interaction.reply(
                "This command can only be run inside of a server"
            );

            return;
        }

        const targetChannelID = interaction.options.get("channel").value;

        try {
            await interaction.deferReply();

            let welcomeChannel = await WelcomeChannel.findOne({
                guildID: interaction.guild.id,
            });

            if (welcomeChannel) {
                if (welcomeChannel.channelID === targetChannelID) {
                    interaction.editReply(
                        "Welcome messages are already being sent to this channel. To disable welcome messages, run `/welcome-disable`"
                    );

                    return;
                }

                welcomeChannel.channelID = targetChannelID;
            } else {
                welcomeChannel = new WelcomeChannel({
                    guildID: interaction.guild.id,
                    channelID: targetChannelID,
                });
            }

            await welcomeChannel.save();

            interaction.editReply(
                "Welcome messages have now been configured. To disable welcome messages, run `/welcome-disable`"
            );
        } catch (error) {
            throw new Error(`Unable to configure welcome messages: ${error}`);
        }
    },
};
