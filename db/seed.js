require("dotenv").config();
const mongoose = require("mongoose");
const PASS = process.env.PASS;
const User = require("../schemas/user-schema");
const userData = require("./data/user-dev-data");

const Comments = require('../schemas/comments-schema');
const commentsData = require('./data/comments-dev-data')

const Chats = require('../schemas/chats-schema')
const chatsData = require('./data/chats-dev-data')

const db = require("./connection");

const seed = async () => {
  try {
    await seedUsers();
    await seedComments();
    await seedChats();
  } catch(err) {
    console.log(err)
  }
}

const seedUsers = async () => {
  console.log("seeding users");
  try {
    await User.deleteMany({});
    await User.insertMany(userData);
  } catch (err) {
    console.log(err)
  }
};

const seedComments=  async () => {
  console.log('seeding comments')
  try {
    await Comments.deleteMany({})
    await Comments.insertMany(commentsData)
  } catch (err) {
    console.log(err)
  }
}

const seedChats = async () => {
  console.log('seeding chats')
  try {
    await Chats.deleteMany({})
    await Chats.insertMany(chatsData)

  } catch (err) {
    console.log(err)
  }
}

module.exports = {seed};
