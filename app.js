require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PASS = process.env.PASS
/* 
mongoose.connect(`mongodb+srv://teamexpress:${PASS}@fan-finder-0.n7vtz4j.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err);
})
 */
/* 
mongoose
    .connect('mongodb://127.0.0.1:27017/test')
    .then((data)=>{
        console.log('connected')
    })
 */


app.use(cors());
app.use(express.json())

app.post('api/users', (req,res)=>{
    console.log(req.body)
})

app.listen(5050, () => console.log("Listening on port 5050!"));

module.exports = app