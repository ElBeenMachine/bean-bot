const { Client, Interaction, PermissionFlagsBits } = require("discord.js");
const AutoRole = require("../../models/AutoRole");

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
        try {
            await interaction.deferReply();

            if (!(await AutoRole.exists({ guildID: interaction.guild.id }))) {
                interaction.editReply(
                    "Autorole has not yet been configured for this server. Run `/autorole-configure` to set it up."
                );
                return;
            }

            await AutoRole.findOneAndDelete({ guildID: interaction.guild.id });
            interaction.editReply("Autorole has been disabled on this server");
        } catch (error) {
            throw new Error(`Unable to disable autorole: ${error}`);
        }
    },
};
