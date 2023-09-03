const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const AutoRole = require("../../models/AutoRole");

module.exports = {
    name: "autorole-configure",
    description: "Set up autorole on your server",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "role",
            description:
                "The role that you would like to be given to users when they join your server.",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    botPermissions: [PermissionFlagsBits.ManageRoles],
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

        const targetRoleID = interaction.options.get("role").value;

        try {
            await interaction.deferReply();

            let autoRole = await AutoRole.findOne({
                guildID: interaction.guild.id,
            });

            if (autoRole) {
                if (autoRole.roleID === targetRoleID) {
                    interaction.editReply(
                        "Autorole has already been cofigured for this role. To disable autorole, run `/autorole-disable`"
                    );

                    return;
                }

                autoRole.roleID = targetRoleID;
            } else {
                autoRole = new AutoRole({
                    guildID: interaction.guild.id,
                    roleID: targetRoleID,
                });
            }

            await autoRole.save();

            interaction.editReply(
                "Autorole has now been configured. To disable autorole, run `/autorole-disable`"
            );
        } catch (error) {
            throw new Error(`Unable to configure autorole: ${error}`);
        }
    },
};
