const { Client, Interaction, PermissionFlagsBits } = require("discord.js");
const WelcomeImage = require("../../models/WelcomeImage");

module.exports = {
    name: "welcome-remove-image",
    description: "Remove the custom background image from the welcome messages",
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
                !(await WelcomeImage.exists({
                    guildID: interaction.guild.id,
                }))
            ) {
                interaction.editReply(
                    "No custom background has been set. Run `/welcome-set-image` to set one up."
                );
                return;
            }

            await WelcomeImage.findOneAndDelete({
                guildID: interaction.guild.id,
            });
            interaction.editReply("Custom welcome background has been removed");
        } catch (error) {
            throw new Error(
                `Unable to remove welcome background image: ${error}`
            );
        }
    },
};
