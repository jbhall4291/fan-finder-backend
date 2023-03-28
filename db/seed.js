require("dotenv").config();
const mongoose = require("mongoose");
const PASS = process.env.PASS;
const User = require("../schemas/user-schema");
const userData = require("./data/user-dev-data");

const db = require("./connection");


const seedUsers = async () => {
  console.log("seeding users");
  try {
    await User.deleteMany({});
    await User.insertMany(userData);
  } catch (err) {
    console.log(err)
  }
};

// seedUsers().then(() => {
//   mongoose.connection.close();
// });

module.exports = { seedUsers };
