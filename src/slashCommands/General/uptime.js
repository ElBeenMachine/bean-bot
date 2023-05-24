const { Embed } = require("../../utils/Embeds");
const moment = require("moment");

const name = "uptime";

module.exports = {
    name,
    description: "Get the uptime of the bot",
    type: 1,
    options: [],
    permissions: {
        DEFUALT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {
        const secs = moment(new Date().toISOString()).diff(process.env.START_TIME, "seconds");
        const uptime = moment.utc(secs * 1000).format('HH [hours, ] mm [minutes and ] ss [seconds]');

        const embed = new Embed(interaction);
        embed.addFields([
            {
                name: "The Bot Has Been Online For",
                value: `\`\`\` ${uptime} \`\`\``
            }
        ]);

        return interaction.reply({ embeds: [ embed ] });
    }
};