const getLocalCommands = require("../../../utils/commands/getLocalCommands");
const { devs, testServer } = require("../../../config");
const { Client, Interaction } = require("discord.js");
const Embed = require("../../../structures/Embed");
const client = require("../../../index");

client.on(
    __dirname.replace(/\\/g, "/").split("/").pop(),
    async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const localCommands = getLocalCommands();

        try {
            const commandObject = localCommands.find(
                (cmd) => cmd.name === interaction.commandName
            );

            if (!commandObject) return;

            await interaction.deferReply();

            // Check if dev only
            if (commandObject.devOnly) {
                if (!devs.includes(interaction.member.id)) {
                    throw new Error(
                        "Only bot developers can use this command."
                    );
                }
            }

            // Check if test server only
            if (commandObject.testOnly) {
                if (interaction.guild.id !== testServer) {
                    throw new Error(
                        "This command cannot be ran in this server."
                    );
                }
            }

            // Check user permissions
            if (commandObject.permissionsRequired?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                        throw new Error("Not enough permissions");
                    }
                }
            }

            // Check bot permissions
            if (commandObject.botPermissions?.length) {
                for (const permission of commandObject.botPermissions) {
                    const bot = interaction.guild.members.me;

                    if (!bot.permissions.has(permission)) {
                        throw new Error("I don't have enough permissions.");
                    }
                }
            }

            // Execute
            await commandObject.callback(client, interaction);
        } catch (error) {
            await interaction.deleteReply();

            console.log(error);

            const errorEmbed = new Embed(client, {
                title: "An error has occurred",
                description: error.message,
                color: 0xff0000,
            });

            await interaction.channel.send({
                embeds: [errorEmbed],
                ephemeral: true,
            });
        }
    }
);
