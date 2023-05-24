const { readdirSync } = require("fs");
const logger = require("../utils/logger");

module.exports = (client) => {
    logger.info("[HANDLER - EVENTS] - Started loading events")
    readdirSync("./src/events/").forEach(dir => {
        const events = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith(".js"));
        for(let file of events) {
            let pull = require(`../events/${dir}/${file}`);
            if(pull.name) {
                client.events.set(pull.name, pull);
                logger.success(`[HANDLER - EVENTS] - Loaded an event: ${pull.name}`);
            } else {
                logger.error(`[HANDLER - EVENTS] - Failed to load the file ${file}. Missing name or aliases`);
                continue;
            }
        }
    });
    logger.info("[HANDLER - EVENTS] - Finished loading events")
}