const User = require("../schemas/user-schema");
const Comments = require("../schemas/comments-schema");
const Chats = require('../schemas/chats-schema')
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
    // console.log(comments, "selected comments");
    return comments;
  });
};

exports.pushGigToUser = (user_id, gig_id) => {
  const filter = {displayName: user_id};
  const update = {$push: {"gigs": gig_id}}

  return User.updateOne(filter, update)
    .then((update)=>{
      
      return User.find({displayName: user_id})
      .then((data) => {return data[0]})
    })
}

exports.selectUserGigs = (user_id) => {
  return User.find({"displayName": user_id})
    .then((user)=>{
      return user[0].gigs
    })
}

exports.selectFansByGig = (gig_id) => {
  return User.find({"gigs": gig_id})
    .then((data)=>{
      console.log(data)
      return data
    })
}

exports.insertComment = (comment) => {
  return Comments.create(comment)
    .then((data)=>{
      console.log(data)
      return data
    })
}

exports.selectChatByChatId = (chat_id) => {
  return Chats.find({"room": chat_id})
    .then((data)=>{
      return data
    })
}

exports.selectChatsByUserId = (user_id) => {

  return User.find({"displayName": user_id})
    .then((user)=>{
      return user[0].chats
    })
}

exports.insertMessageToChat = (chat_id, user_id, message, created_at) => {
  const new_message =     {
    "user": user_id,
    "message": message,
    "room": chat_id,
    "created_at": created_at
  }

  return Chats.create(new_message)
    .then((data)=>{
      console.log(data, "inserted chat message")
      return data
    })
}