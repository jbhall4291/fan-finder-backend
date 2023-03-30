const {
  selectAllUsers,
  selectUserByName,
  createUser,
  selectComments,
  selectCommentsByGigId,
  pushGigToUser, 
  selectUserGigs,
  selectFansByGig
} = require("../models/models");

exports.getUsers = (req, res, next) => {
  console.log("getting users...")
  return selectAllUsers()
    .then((data) => {
      console.log("sending users...")
      res.status(200).send({ users: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserbyName = (req, res, next) => {
  const { displayName } = req.params;
  return selectUserByName(displayName)
    .then((data) => {
      res.status(200).send({ user: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUser = (req, res, next) => {
  const { displayName, avatarURL } = req.body;

  return createUser(displayName, avatarURL)
    .then((returnedUser) => {
      res.status(201).send({ user: returnedUser });
    })
    .catch((err) => {
      console.log();
    });
};

exports.getComments = (req, res, next) => {
  console.log("getting comments...")
  return selectComments()
    .then((comments) => {
      console.log("sending commments...")
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCommentsByGigId = (req, res, next) => {
  const { gig_id } = req.params;
  // console.log(gig_id, "gig id")
  return selectCommentsByGigId(gig_id)
    .then((comments) => {
      // console.log(comments);
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.patchUserGigs = (req, res, next) => {
  const {user_id} = req.params;
  const {gig_id} = req.body;
  console.log(user_id)

  return pushGigToUser(user_id, gig_id)
    .then((result)=>{
      console.log(result, "updated gigs")
      res.status(201).send({"gigs": result.gigs})
    })
    .catch((err)=>{
      console.log(err)
    })
}

exports.getUserGigs = (req, res, next) => {
  const {user_id} = req.params

  return selectUserGigs(user_id)
    .then((result)=>{
      console.log(result, "user gigs")
      res.status(200).send({"gigs": result})
    })
    .catch((err)=>{
      console.log(err)
    })
}

exports.getFansByGig = (req, res, next) => {
  const {gig_id} = req.params;
  console.log(gig_id)

  return selectFansByGig(gig_id)
    .then((data)=>{
      console.log(data)
      res.status(200).send({"fans": data})
    })
    .catch((err)=>{
      console.log(err)
    })
}