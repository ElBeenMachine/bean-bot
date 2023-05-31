const { Embed } = require("../../utils/Embeds");
const { QueueRepeatMode } = require("discord-player");
const MusicChannelCheck = require("../../utils/MusicChannelCheck");

const name = "repeat";

module.exports = {
    name,
    description: "Repeat the current song queue",
    type: 1,
    options: [{
        name: 'mode',
        type: 3,
        description: 'Repeat Mode',
        required: true,
        choices: [
            {
                name: "Queue",
                value: "queue"
            },
            {
                name: "Track",
                value: "track"
            },
            {
                name: "Autoplay",
                value: "autoplay"
            },
            {
                name: "Off",
                value: "off"
            }
        ]
    }],
    permissions: {
        DEFUALT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction) => {
        await interaction.deferReply();
        await MusicChannelCheck(interaction);
        
        const queue = client.player.nodes.get(interaction.guild.id);
        if(!queue) throw new Error("No Queue");
        
        const mode = interaction.options.get('mode').value;

        try {
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

            // Send reply
            await interaction.editReply({
                embeds: [
                    new Embed(interaction)
                        .setColor("Purple")
                        .setAuthor({ name: "Repeat", iconURL: client.user.displayAvatarURL() })
                        .addFields([
                            {
                                name: "Repeat Mode Changed",
                                value: message,
                                inline: true
                            }
                        ])
                ]
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
};