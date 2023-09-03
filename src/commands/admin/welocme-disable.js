const { Client, Interaction, PermissionFlagsBits } = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");

module.exports = {
    name: "welcome-disable",
    description: "Disable welcome messages on your server",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [],
    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    botPermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        try {
            await interaction.deferReply();

            if (
                !(await WelcomeChannel.exists({
                    guildID: interaction.guild.id,
                }))
            ) {
                interaction.editReply(
                    "Welcome messages have not yet been configured for this server. Run `/welcome-configure` to set them up."
                );
                return;
            }

            await WelcomeChannel.findOneAndDelete({
                guildID: interaction.guild.id,
            });
            interaction.editReply(
                "Welcome messages have been disabled on this server"
            );
        } catch (error) {
            throw new Error(`Unable to disable welcome messages: ${error}`);
        }
    },
};
