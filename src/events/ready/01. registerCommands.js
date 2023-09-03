const areCommandsDifferent = require("../../utils/commands/areCommandsDifferent");
const getApplicationCommands = require("../../utils/commands/getApplicationCommands");
const getLocalCommands = require("../../utils/commands/getLocalCommands");
const { testServer } = require("../../config");

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name,
                testServer
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`🔴 Deleted command "${name}"`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`🔵 Edited command "${name}"`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(
                        `🟠 Skipping registration of command "${name}" as it is flagged as deleted.`
                    );
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`🟢 Registered command "${name}"`);
            }
        }
    } catch (error) {
        console.log(
            `🔴 There was an error while registering a command: ${error.message}`
        );
    }
};
