const { GuildMember, Client } = require("discord.js");
const AutoRole = require("../../models/AutoRole");

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
    try {
        let guild = member.guild;
        if (!guild) return;

        const autoRole = await AutoRole.findOne({ guildID: guild.id });
        if (!autoRole) return;

        await member.roles.add(autoRole.roleID);
    } catch (error) {
        throw error;
    }
};
