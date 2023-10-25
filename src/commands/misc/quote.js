const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
} = require("discord.js");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "quote",
    description: "Create a quote",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "quote",
            description: "What was said? and Who by?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "author",
            description: "Who Said It?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "date",
            description: "When was it said?",
            required: true,
            type: ApplicationCommandOptionType.String,
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
        const quote = interaction.options.get("quote").value;
        const author = interaction.options.get("author").value;
        const date = interaction.options.get("date").value;

        const embed = new Embed(client, {
            title: `Quote from ${author}`,
            description: `"${quote}"`,
        });

        embed.setColor(0xff9000);

        embed.setFooter({
            text: `${client.user.username}   |   Quote Logged By ${interaction.user.displayName}`,
            iconURL: interaction.user.displayAvatarURL(),
        });

        if (date) {
            embed.addFields([
                {
                    name: "Date",
                    value: `${date}`,
                },
            ]);
        }

        await interaction.editReply({ embeds: [embed] });
    },
};
