const {seedUsers} = require("./seed");
const mongoose = require("mongoose");

const runSeed = () => {
  return seedUsers().then(() => {
    mongoose.connection.close();
  });
};

runSeed();
