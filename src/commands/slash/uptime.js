const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require("moment");

module.exports = {
    name: 'uptime',
    prettyName: "Uptime",
    description: 'displays the bots current uptime',
    register_command: new SlashCommandBuilder().setName('uptime').setDescription('Displays bot uptime!'),
    execute(client, interaction) {
        const secs = moment(new Date().toISOString()).diff(process.env.START_TIME, "seconds");
        const uptime = moment.utc(secs * 1000).format('HH [hours, ] mm [minutes and ] ss [seconds]');
        const uptimeEmbed = new MessageEmbed()
            .setColor("#2b2d31")
            .addFields([
                {
                    name: "The Bot Has Been Online For",
                    value: `\`\`\` ${uptime} \`\`\``
                }
            ])
            .setAuthor({ name: this.prettyName, iconURL: client.user.avatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [uptimeEmbed] });
    }
};
