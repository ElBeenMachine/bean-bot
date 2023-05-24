const client = require("../index");
const { EmbedBuilder } = require("discord.js");

function capitalise(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

class Embed extends EmbedBuilder {
    constructor(interaction) {
        const author = interaction.commandName != null ? capitalise(interaction.commandName) : client.user.username;
        super();
        this.setTimestamp()
        this.setColor(client.config.colour)
        this.setAuthor({ name: `${author}`, iconURL: client.user.displayAvatarURL(), url: 'https://www.apachebot.net' })
    }
}

class ErrorEmbed extends EmbedBuilder {
    constructor(interaction, error) {
        const author = interaction.commandName != null ? capitalise(interaction.commandName) : client.user.username;
        super();
        this.setColor("Red");
        this.setAuthor({ name: `${author}`, iconURL: client.user.displayAvatarURL() })
        this.setTimestamp();
        this.addFields([
            {
                name: "An Error Has Occurred",
                value: `\`\`\`${error}\`\`\``
            }
        ]);
    }
}

module.exports.Embed = Embed;
module.exports.ErrorEmbed = ErrorEmbed;