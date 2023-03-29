const User = require("../schemas/user-schema");
const Comments = require("../schemas/comments-schema");
const connection = require("../db/connection");

exports.selectAllUsers = () => {
  return User.find().then((users) => {
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
    return comments;
  });
};

exports.selectCommentsByGigId = (gig_id) => {
  return Comments.find({ gig_id: gig_id }).then((comments) => {
    console.log(comments, "selected comments");
    return comments;
  });
};

exports.pushGigToUser = (user_id, gig_id) => {
  const filter = {displayName: user_id};
  const update = {$push: {"gigs": gig_id}}

  return User.updateOne(filter, update)
    .then((update)=>{
      console.log(update)
    })
}

exports.selectUserGigs = (user_id) => {
  return User.find({displayName: user_id})
    .then((user)=>{
      return user.gigs
    })
}