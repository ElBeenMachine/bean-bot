const { Client, Interaction, PermissionFlagsBits } = require("discord.js");
const WelcomeImage = require("../../models/WelcomeImage");
const Embed = require("../../structures/Embed");

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
        if (
            !(await WelcomeImage.exists({
                guildID: interaction.guild.id,
            }))
        ) {
            throw new Error(
                "No custom background has been set. Run `/welcome-set-image` to set one up."
            );
        }

        await WelcomeImage.findOneAndDelete({
            guildID: interaction.guild.id,
        });

        const successEmbed = new Embed(client, {
            title: "Success",
            description: "Custom welcome background has been removed",
            color: 0xfff900,
        });

        await interaction.editReply({ embeds: [successEmbed] });
    },
};
