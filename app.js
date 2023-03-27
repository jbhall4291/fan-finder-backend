require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PASS = process.env.PASS

mongoose.connect(`mongodb+srv://teamexpress:${PASS}@fan-finder-0.n7vtz4j.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err);
})


app.use(cors());

app.listen(5050, () => console.log("Listening on port 5050!"));
