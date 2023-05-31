const client = require("../../index");
const resetStatus = require("../../utils/ResetStatus");

module.exports = {
    name: "emptyQueue.js"
}

// When the queue is emptied
client.player.events.on("emptyQueue", async (queue, track) => {
    // Delete the old now playing message if exists
    if(queue.metadata.nowPlaying) {
        const msg = await queue.metadata.channel.messages.fetch(queue.metadata.nowPlaying);
        await msg.delete();
    }
    
    // Reset the bot's status
    resetStatus()
});