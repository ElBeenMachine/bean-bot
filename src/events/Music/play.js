const client = require("../../index");
const { Embed } = require("../../utils/Embeds")

module.exports = {
    name: "play.js"
}

// When a new song is queued
client.player.events.on("playerStart", async (queue, track) => {
    // Send now playing message
    await queue.metadata.channel.send({
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
                .setFooter({ text: `Song Requested by ${queue.metadata.user.username}`, iconURL: queue.metadata.user.displayAvatarURL() })
                .setAuthor({ name: "Now Playing", iconURL: client.user.displayAvatarURL() })
        ]
    });
});