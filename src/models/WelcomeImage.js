const { Schema, model } = require("mongoose");

const WelcomeImageSchema = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

module.exports = model("WelcomeImage", WelcomeImageSchema);
