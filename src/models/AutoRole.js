const { Schema, model } = require("mongoose");

const AutoRoleSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },
    roleID: {
        type: String,
        required: true,
    },
});

module.exports = model("AutoRole", AutoRoleSchema);
