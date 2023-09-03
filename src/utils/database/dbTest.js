const { default: mongoose } = require("mongoose");
const dbConnect = require("./dbConnect");

async function dbTest() {
    dbConnect().then(() => {
        const connectedState = mongoose.connection.readyState;
        if (connectedState != 1) return false;
        return true;
    });
}

module.exports = dbTest;
