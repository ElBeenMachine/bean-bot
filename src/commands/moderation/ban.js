const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");

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
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: "reason",
            description: "The reason for the ban.",
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [],
    callback: (client, interaction) => {
        interaction.reply(`Ban...`);
    },
};
