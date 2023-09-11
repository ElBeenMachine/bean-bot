const { Client, Interaction, PermissionFlagsBits } = require("discord.js");
const WelcomeChannel = require("../../models/WelcomeChannel");
const Embed = require("../../structures/Embed");

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
        if (
            !(await WelcomeChannel.exists({
                guildID: interaction.guild.id,
            }))
        ) {
            throw new Error(
                "Welcome messages have not yet been configured for this server. Run `/welcome-configure` to set them up."
            );
        }

        await WelcomeChannel.findOneAndDelete({
            guildID: interaction.guild.id,
        });

        const successEmbed = new Embed(client, {
            title: "Success",
            description: "Welcome messages have been disabled on this server",
            color: 0xfff900,
        });

        await interaction.editReply({
            embeds: [successEmbed],
        });
    },
};
