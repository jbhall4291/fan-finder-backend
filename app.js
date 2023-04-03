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
    getComments,
    getCommentsByGigId,
    patchUserGigs,
    getUserGigs,
    getFansByGig,
    postCommentByGig,
    getChatByChatId,
    getChatsByUserId,
    postMessageToChat
} = require('./controllers/controllers.js')
const { handle404s, handle500s } = require('./controllers/errorHandlingControllers')

// socketio setup
const http = require('http')
const { Server } = require('socket.io')

app.use(cors());
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    },
    path: "/"
})



app.use(express.json())

app.post('/api/users', postUser)
app.post('/api/users/:user_id/:chat_id', postMessageToChat)


app.get('/api/users', getUsers)
app.get('/api/users/:user_id/gigs', getUserGigs)
app.get('/api/users/:displayName', getUserbyName)

app.get('/api/comments', getComments)
app.get('/api/gigs/:gig_id/comments', getCommentsByGigId)
app.post('/api/gigs/:gig_id/comments', postCommentByGig)

app.get('/api/gigs/:gig_id/fans', getFansByGig)
app.patch('/api/users/:user_id/gigs', patchUserGigs)

app.get('/api/users/:user_id/chats', getChatsByUserId)
app.get('/api/users/:user_id/:chat_id', getChatByChatId)
// Create new chat

app.use(handle404s);
app.use(handle500s)
// socket io 
io.sockets.on('connection', (socket) =>{
    console.log(`User connected: ${socket.id}`)

    socket.on('join_room', (data)=>{
        const {user, room} = data;
        socket.join(room);
        console.log(`${user} joined ${room}`)    
    })

    socket.on('send_message', (data)=>{
        console.log(data, `got message`)
        const {room, msg} = data;
        socket.in(room).emit('send_message', data)
    })
})
server.listen(4040, ()=>{
    console.log('listening on port 4040')
})


module.exports = app