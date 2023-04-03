const {seed} = require("./seed");
const mongoose = require("mongoose");

export const runSeed = () => {
  return seed().then(() => {
    mongoose.connection.close();
  });
};
