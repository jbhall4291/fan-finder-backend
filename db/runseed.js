const {seed} = require("./seed");
const mongoose = require("mongoose");

const runSeed = () => {
  return seed().then(() => {
    mongoose.connection.close();
  });
};

runSeed();
