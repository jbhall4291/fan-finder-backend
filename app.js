require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PASS = process.env.PASS
const {
    getUsers,
    getUserbyName, 
    postUser,
    getComments
} = require('./controllers/controllers.js')
const { handle404s } = require('./controllers/errorHandlingControllers')


app.use(cors());
app.use(express.json())

app.post('/api/users', postUser)


app.get('/api/users', getUsers)
app.get('/api/users/:displayName', getUserbyName)
app.get('/api/comments', getComments)


app.use(handle404s);


module.exports = app