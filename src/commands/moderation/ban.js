const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    Client,
    Interaction,
} = require("discord.js");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "ban",
    description: "Bans a member from the server.",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "user",
            description: "The user that you want to ban.",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "The reason for the ban.",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
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
            throw new Error("You cannot ban the owner of the server.");
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition =
            interaction.member.roles.highest.position;
        const botRolePosition =
            interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            throw new Error(
                "You cannot ban that user because they have the same/higher role than you."
            );
        }

        if (targetUserRolePosition >= botRolePosition) {
            throw new Error(
                "I cannot ban that user because they have the same/higher role than me"
            );
        }

        await targetUser.ban({ reason });
        const bannedEmbed = new Embed(client, {
            title: "🔨 User Banned",
            color: 0xfff900,
        });

        bannedEmbed.addFields([
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

        await interaction.editReply({ embeds: [bannedEmbed] });
    },
};
