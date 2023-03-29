require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PASS = process.env.PASS
const {
    getUsers,
    getUserbyName, 
    postUser
} = require('./controllers/controllers.js')
const { handle404s } = require('./controllers/errorHandlingControllers')


app.use(cors());
app.use(express.json())

app.post('/api/users', postUser)


app.get('/api/users', getUsers)
app.get('/api/users/:displayName', getUserbyName)


app.use(handle404s);


app.listen(5050, () => console.log("Listening on port 5050!"));


module.exports = app