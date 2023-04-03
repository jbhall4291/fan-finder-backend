const {seed} = require("./seed");
const mongoose = require("mongoose");

exports.runSeed = () => {
  return seed().then(() => {
    mongoose.connection.close();
  });
};
