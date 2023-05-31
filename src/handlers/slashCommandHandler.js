const logger = require("../utils/logger");
const { PermissionsBitField } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = async (client) => {
    logger.info("[HANDLER - SLASH COMMANDS] - Loading Slash Commands");
    let commands = [];

    readdirSync("./src/slashCommands/").forEach(dir => {
        const slash_commands = readdirSync(`./src/slashCommands/${dir}`).filter(file => file.endsWith(".js"));

        for(let command of slash_commands) {
            let pull = require(`../slashCommands/${dir}/${command}`);

            if(pull.name, pull.description, pull.type == 1) {
                client.slash_commands.set(pull.name, pull);
                logger.success(`[HANDLER - SLASH COMMANDS] - Loaded a slash command: ${pull.name} (#${client.slash_commands.size})`);

                commands.push({
                    name: pull.name,
                    description: pull.description,
                    type: pull.type || 1,
                    options: pull.options ? pull.options : null,
                    default_permissions: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
                    default_member_permissions: pull.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.DEFAULT_MEMBER_PERMISSIONS).toString() : null
                });
            } else {
                logger.error(`[HANDLER - SLASH COMMANDS] - Couldn't load the file ${command}, missing module name value, description, or type isn't 1.`);
                continue;
            }
        }
    });

    // Set the commands
    switch (process.env.MODE) {
        case "DEV":
                if(process.env.DEV_ID) {
                    logger.warn(`[HANDLER - COMMANDS] - Loading commands into development guild with id ${process.env.DEV_ID}`)
                    await client.application.commands.set(commands, process.env.DEV_ID).then(() => logger.warn("[HANDLER - COMMANDS] - Slash commands loaded in development environment")).catch((e) => logger.error(e));
                } else {
                    throw new Error("DEV_ID environment variable is not set")
                }
            break;
    
        default:
                await client.application.commands.set(commands).then(() => logger.success("[HANDLER - COMMANDS] - Slash commands loaded")).catch((e) => logger.error(e));
            break;
    }
}