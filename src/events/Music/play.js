const { ActivityType, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextChannel } = require("discord.js");
const client = require("../../index");
const { Embed } = require("../../utils/Embeds")

module.exports = {
    name: "play.js"
}

// When a new song is queued
client.player.events.on("playerStart", async (queue, track) => {
    // Delete the old now playing message if exists
    if(queue.metadata.nowPlaying) {
        const msg = await queue.metadata.channel.messages.fetch(queue.metadata.nowPlaying);
        await msg.delete();
    }

    // Update bot's status message
    client.user.setPresence({
        activities: [{ name: `${track.title}`, type: ActivityType.Listening }],
        status: 'online',
    });

    // Create a skip button
    const skip = new ButtonBuilder()
        .setCustomId('skip')
        .setLabel('Skip')
        .setStyle(ButtonStyle.Danger);

    // Skip function
    async function skipSong(confirmation) {
        try {
            // Skip the current song
            await queue.node.skip();
            await confirmation.channel.send({
                embeds: [
                    new Embed(confirmation)
                        .setColor("Purple")
                        .setAuthor({ name: "Song Skipped", iconURL: client.user.displayAvatarURL() })
                        .setTitle(`${track.title}`)
                        .setURL(track.url)
                        .setThumbnail(track.thumbnail)
                        .addFields([
                            {
                                name: "Artist",
                                value: track.author,
                                inline: true
                            },
                            {
                                name: "Skipped By",
                                value: confirmation.user.username
                            }
                        ])
                ]
            });
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    // Create action button row
    const row = new ActionRowBuilder()
        .addComponents(skip);

    // Send now playing message
    const response = await queue.metadata.channel.send({
        embeds: [
            new Embed(queue.metadata)
                .setTitle(`${track.title}`)
                .setURL(track.url)
                .setThumbnail(track.thumbnail)
                .addFields([
                    {
                        name: "Artist",
                        value: track.author,
                        inline: true
                    },
                    {
                        name: "Duration",
                        value: track.duration,
                        inline: true
                    },
                    {
                        name: "Requested By",
                        value: queue.metadata.user.username
                    }
                ])
                .setAuthor({ name: "Now Playing", iconURL: client.user.displayAvatarURL() })
        ],
        components: [
            row
        ]
    });
    
    // Set the now playing message ID
    queue.metadata.nowPlaying = response.id;

    try {
        const confirmation = await response.awaitMessageComponent({ time: 300000 });
        if (confirmation.customId === 'skip') {
            skipSong(confirmation);
        }
    } catch (e) {
        await queue.metadata.editReply({
            embeds: [
                new Embed(queue.metadata)
                    .setTitle(`${track.title}`)
                    .setURL(track.url)
                    .setThumbnail(track.thumbnail)
                    .addFields([
                        {
                            name: "Artist",
                            value: track.author,
                            inline: true
                        },
                        {
                            name: "Duration",
                            value: track.duration,
                            inline: true
                        },
                        {
                            name: "Requested By",
                            value: queue.metadata.user.username
                        }
                    ])
                    .setAuthor({ name: "Now Playing", iconURL: client.user.displayAvatarURL() })
            ],
            components: []
        });
    }
});