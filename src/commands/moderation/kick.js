const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    Client,
    Interaction,
} = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks a member from the server.",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "user",
            description: "The user that you want to kick.",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: "reason",
            description: "The reason for the kick.",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        const targetUserID = interaction.options.get("user").value;
        const reason =
            interaction.options.get("reason")?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserID);

        if (!targetUser) {
            await interaction.editReply(
                "That user no longer exists in this server"
            );
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply(
                "You cannot kick the owner of the server."
            );
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition =
            interaction.member.roles.highest.position;
        const botRolePosition =
            interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(
                "You cannot kick that user because they have the same/higher role than you."
            );
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(
                "I cannot kick that user because they have the same/higher role than me"
            );
            return;
        }

        try {
            await targetUser.kick(reason);
            await interaction.editReply(
                `User ${targetUser} was kicked.\nReason: ${reason}`
            );
        } catch (error) {
            throw new Error(`There was an error when kicking a user: ${error}`);
        }
    },
};
