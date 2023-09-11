const client = require("../../../index");

client.player.events.on(
    __dirname.replace(/\\/g, "/").split("/").pop(),
    async (queue, track) => {
        // Set topic of voice channel to current song
        const channel = queue.channel;
        console.log(`🟣 | Now Playing ${track.title} by ${track.author}`);
    }
);
