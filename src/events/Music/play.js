const client = require("../../index");

module.exports = {
    name: "play.js"
}

// When a new song is queued
client.player.events.on("playerStart", async (queue, track) => {
    // Send now playing message
    await queue.metadata.channel.send(`Started playing **${track.title}**!`)
});