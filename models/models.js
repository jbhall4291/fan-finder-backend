const User = require("../schemas/user-schema");
const Comments = require("../schemas/comments-schema");
const connection = require("../db/connection");

exports.selectAllUsers = () => {
  return User.find().then((users) => {
    console.log("got users from mongo")
    return users;
  });
};

exports.selectUserByName = (displayName) => {
  return User.findOne({ displayName: displayName }).then((user) => {
    return user;
  });
};

exports.createUser = (displayName, avatarURL) => {
  return User.create({ displayName: displayName, avatarUrl: avatarURL });
};
exports.selectComments = () => {
  console.log("selecting comments!");
  return Comments.find().then((comments) => {
    console.log("got comments from mongo")
    return comments;
  });
};

exports.selectCommentsByGigId = (gig_id) => {
  return Comments.find({ gig_id: gig_id }).then((comments) => {
    console.log(comments, "selected comments");
    return comments;
  });
};
