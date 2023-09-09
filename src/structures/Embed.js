const { EmbedBuilder, Client } = require("discord.js");

class Embed extends EmbedBuilder {
    #title;
    #description;

    /**
     *
     * @param {Client} client
     * @param {String} title
     * @param {String} description
     */
    constructor(client, title = "Untitled Embed", description = "") {
        super();
        this.setTitle(title);
        this.setDescription(description);
        this.setTimestamp();
        this.setColor(0x00ffff);
        this.setFooter({
            text: `${client.user.username} | Created By Ollie B`,
            iconURL: client.user.displayAvatarURL(),
        });
    }
}

module.exports = Embed;
