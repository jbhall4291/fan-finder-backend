const User = require("../schemas/user-schema");
const connection = require("../db/connection");

exports.selectAllUsers = () => {
  return User.find().then((users) => {
    return users;
  });
};

exports.selectUserByName = (displayName) => {
    console.log("here in models")
  return User.findOne({ displayName: displayName }).then((user) => {
    console.log(user);
    return user;
  });
};
