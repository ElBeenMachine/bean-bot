module.exports = {
    name: "ping",
    description: "pong",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [],
    permissionsRequired: [],
    botPermissions: [],
    callback: (client, interaction) => {
        interaction.reply(`Pong!`);
    },
};
