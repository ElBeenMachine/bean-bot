const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    Client,
    Interaction,
} = require("discord.js");
const Embed = require("../../structures/Embed");

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
            type: ApplicationCommandOptionType.User,
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

        const targetUser = await interaction.guild.members.fetch(targetUserID);

        if (!targetUser) {
            throw new Error("That user no longer exists in this server");
        }

        if (targetUser.id === interaction.guild.ownerId) {
            throw new Error("You cannot kick the owner of the server.");
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition =
            interaction.member.roles.highest.position;
        const botRolePosition =
            interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            throw new Error(
                "You cannot kick that user because they have the same/higher role than you."
            );
        }

        if (targetUserRolePosition >= botRolePosition) {
            throw new Error(
                "I cannot kick that user because they have the same/higher role than me"
            );
        }

        await targetUser.kick(reason);
        const kickEmbed = new Embed(client, {
            title: "🔨 User Kicked",
            color: 0xfff900,
        });

        kickEmbed.addFields([
            {
                name: "User",
                value: `${targetUser}`,
                inline: true,
            },
            {
                name: "Reason",
                value: reason,
                inline: true,
            },
        ]);
        await interaction.editReply({ embeds: [kickEmbed] });
    },
};
