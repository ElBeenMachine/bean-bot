const AutoRole = require("../../../models/AutoRole");
const client = require("../../../index");

client.on(__dirname.replace(/\\/g, "/").split("/").pop(), async (member) => {
    try {
        let guild = member.guild;
        if (!guild) return;

        const autoRole = await AutoRole.findOne({ guildID: guild.id });
        if (!autoRole) return;

        await member.roles.add(autoRole.roleID);
    } catch (error) {
        throw error;
    }
});
