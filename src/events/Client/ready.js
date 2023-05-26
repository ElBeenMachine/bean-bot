const logger = require("../../utils/logger");
const client = require("../../index");
const resetStatus = require("../../utils/ResetStatus");

module.exports = {
    name: "ready.js"
}

// When the ready event is called
client.once("ready", async () => {
    // Log that the client is ready
    logger.info(`[READY] - ${client.user.tag} is up and ready to go`);
    
    // Load Application Commands
    require("../../handlers/slashCommandHandler")(client);

    // Set the start time
    process.env.START_TIME = new Date().toISOString();

    // Reset the bot's status
    resetStatus();
});