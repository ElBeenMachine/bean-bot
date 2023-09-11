const client = require("../../../index");

client.on(__dirname.split("\\").pop(), (client) => {
    console.log(`🟢 | Client logged in as ${client.user.username}`);
});
