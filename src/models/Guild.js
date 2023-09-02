import mongoose from "mongoose";

const GuildSchema = new mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    autoroles: {
        type: Array,
        required: false,
        default: [],
    },
});

module.exports = mongoose.model("Guild", GuildSchema);
