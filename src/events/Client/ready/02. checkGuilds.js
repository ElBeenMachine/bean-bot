const client = require("../../../index");

client.on(__dirname.replace(/\\/g, "/").split("/").pop(), () => {});
