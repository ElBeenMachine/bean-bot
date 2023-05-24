const fs = require('fs');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Logger = require('../utils/logger');

class CommandManager {
    constructor() {
        this.rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
        this.slashCommands = new Collection();
    }

    scanSlashCommand() {
        fs.readdirSync('./src/commands/slash').filter((file) => file.endsWith('.js')).forEach((file) => {
            const commandName = file.split('.')[0];
            Logger.info(`[Commands] Attempting to load slash command ${commandName}`);

            try {
                const command = require(`./slash/${commandName}`);
                this.slashCommands.set(command.name, command);
            } catch (error) {
                Logger.warn(`[Commands] Unable to load slash command ${commandName}:\n${error.stack}\n`);
            }
        });
    }

    async registerSlashCommands() {
        try {
            Logger.info(`[REST] Registering ${this.slashCommands.size} slash commands`);
            await this.rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: this.slashCommands });
            Logger.success('[REST] Successfully registered all commands');
        } catch (error) {
            Logger.error('[REST] Failed to register commands');
        }
    }
}

module.exports = CommandManager;
