const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const AutoRole = require("../../models/AutoRole");

const Embed = require("../../structures/Embed");

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
            throw new Error("This command can only be run inside of a server");
        }

        const targetRoleID = interaction.options.get("role").value;

        let autoRole = await AutoRole.findOne({
            guildID: interaction.guild.id,
        });

        if (autoRole) {
            if (autoRole.roleID === targetRoleID) {
                throw new Error(
                    "Autorole has already been cofigured for this role. To disable autorole, run `/autorole-disable`"
                );
            }

            autoRole.roleID = targetRoleID;
        } else {
            autoRole = new AutoRole({
                guildID: interaction.guild.id,
                roleID: targetRoleID,
            });
        }

        await autoRole.save();

        const successEmbed = new Embed(client, {
            title: "Success",
            description:
                "Autorole has now been configured. To disable autorole, run `/autorole-disable`",
            color: 0xfff900,
        });

        await interaction.editReply({ embeds: [successEmbed] });
    },
};
