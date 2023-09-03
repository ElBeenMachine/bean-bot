const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
    name: "test-join",
    description: "Simulate a user joining the current server",
    devOnly: true,
    testOnly: true,
    deleted: false,
    options: [
        {
            name: "user",
            description: "The user that you want to simulate the event for",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    permissionsRequired: [],
    botPermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        await interaction.reply({
            content: "Simulating user joining...",
            ephemeral: true,
        });

        const targetUserID = interaction.options.get("user").value;
        const targetUser = await interaction.guild.members.fetch(targetUserID);

        await client.emit("guildMemberAdd", targetUser);
    },
};
