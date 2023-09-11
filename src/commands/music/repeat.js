const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
} = require("discord.js");
const MusicChannelCheck = require("../../utils/checks/MusicChannelCheck");
const Embed = require("../../structures/Embed");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "repeat",
    description: "Set the repeat mode of the queue",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "mode",
            type: ApplicationCommandOptionType.String,
            description: "Repeat Mode",
            required: true,
            choices: [
                {
                    name: "Queue",
                    value: "queue",
                },
                {
                    name: "Track",
                    value: "track",
                },
                {
                    name: "Autoplay",
                    value: "autoplay",
                },
                {
                    name: "Off",
                    value: "off",
                },
            ],
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
        await MusicChannelCheck(interaction);

        const queue = client.player.nodes.get(interaction.guild.id);
        if (!queue) throw new Error("No Queue");

        const mode = interaction.options.get("mode").value;

        let message;
        // Set repeat mode#
        switch (mode) {
            case "off":
                queue.setRepeatMode(QueueRepeatMode.OFF);
                message = "Repeat mode has been turned off";
                break;
            case "queue":
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                message = "The queue will be repeated";
                break;
            case "track":
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                message = "The current track will repeat itself";
                break;
            case "autoplay":
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                message = "Autoplay mode enabled";
                break;
        }

        const replyEmbed = new Embed(client, {
            title: "Repeat Mode Changed",
            description: message,
        });

        await interaction.editReply({
            embeds: [replyEmbed],
        });
    },
};
