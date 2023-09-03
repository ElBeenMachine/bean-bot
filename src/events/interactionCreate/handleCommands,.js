const getLocalCommands = require("../../utils/commands/getLocalCommands");
const { devs, testServer } = require("../../config");

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        // Check if dev only
        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only bot developers can use this command.",
                    ephemeral: true,
                });

                return;
            }
        }

        // Check if test server only
        if (commandObject.testOnly) {
            if (!interaction.guid.id === testServer) {
                interaction.reply({
                    content: "This command cannot be ran in this server.",
                    ephemeral: true,
                });

                return;
            }
        }

        // Check user permissions
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Not enough permissions",
                        ephemeral: true,
                    });

                    return;
                }
            }
        }

        // Check bot permissions
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });

                    return;
                }
            }
        }

        // Execute
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`🔴 | There was an error running this command: ${error}`);
    }
};
