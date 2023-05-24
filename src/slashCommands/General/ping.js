const { Embed } = require("../../utils/Embeds");

const name = "ping";

module.exports = {
    name,
    description: "Get the websocket ping of the bot",
    type: 1,
    options: [],
    permissions: {
        DEFUALT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {
        const embed = new Embed(interaction);
        embed.addFields([
            {
                name: "My Websocket Ping Is",
                value: `\`\`\` ${client.ws.ping}ms \`\`\``
            }
        ]);

        return interaction.reply({ embeds: [ embed ] });
    }
};