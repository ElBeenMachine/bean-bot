const { Client, Interaction, PermissionFlagsBits } = require("discord.js");
const AutoRole = require("../../models/AutoRole");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "autorole-disable",
    description: "Disable autorole on your server",
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
        if (!(await AutoRole.exists({ guildID: interaction.guild.id }))) {
            throw new Error(
                "Autorole has not yet been configured for this server. Run `/autorole-configure` to set it up."
            );
        }

        await AutoRole.findOneAndDelete({ guildID: interaction.guild.id });
        const successEmbed = new Embed(client, {
            title: "Success",
            description: "Autorole has been disabled on this server",
            color: 0xfff900,
        });
        interaction.editReply({ embeds: [successEmbed] });
    },
};
