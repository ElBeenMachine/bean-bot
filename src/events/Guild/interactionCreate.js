const { Embed, ErrorEmbed } = require("../../utils/Embeds");
const client = require("../../index");

module.exports = {
    name: "interactionCreate"
}

client.on("interactionCreate", async(interaction) => {
    async function handleError(error) {
        const embeds = [
            new ErrorEmbed(interaction, error)
        ];
        
        try {
            return await interaction.editReply({ embeds });
        } catch(e) {
            try {
                return await interaction.reply({ embeds });
            } catch (error) {
                return await interaction.channel.send({ embeds });
            }
        }
    }
    
    if(interaction.isChatInputCommand()) {
        const command = client.slash_commands.get(interaction.commandName);
        if(!command) return;
        
        // Run command
        try {
            await command.run(client, interaction);
        } catch(e) {
            return await handleError(e);
        }
    }
});