require("dotenv").config();
const mongoose = require("mongoose");
const PASS = process.env.PASS;
const User = require("../schemas/user-schema");
const userData = require("./data/user-dev-data");

const db = require('./connection')

/* mongoose
  .connect(
    `mongodb+srv://teamexpress:${PASS}@fan-finder-0.n7vtz4j.mongodb.net/Fan-finder-development?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
*/

const seedUsers = async () => {
  console.log('seeding users')
  await User.deleteMany({});
  await User.insertMany(userData);
};

seedUsers().then(() => {
  mongoose.connection.close();
});

module.exports = {seedUsers}