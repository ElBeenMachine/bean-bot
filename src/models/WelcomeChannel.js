const { Schema, model } = require("mongoose");

const WelcomeChannelSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },
    channelID: {
        type: String,
        required: true,
    },
});

module.exports = model("WelcomeChannel", WelcomeChannelSchema);
