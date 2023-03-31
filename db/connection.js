const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";

console.log(process.env.NODE_ENV + "<<<< process thingy")
console.log(ENV + "<<< ENV")

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (ENV !== "production") {
  connectionURL = process.env.DEVELOPMENT_DB;
} else {
  connectionURL = process.env.PROD_DB;
}
const connection = mongoose.connect(connectionURL).then(() => {
  console.log("connection successful");
});

module.exports = connection;
