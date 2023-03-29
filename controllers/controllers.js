const {
    selectAllUsers,
    selectUserByName,
    createUser,
    selectComments
} = require('../models/models')

exports.getUsers = (req, res, next) => {
    return selectAllUsers()
        .then((data) => {
            res.status(200).send({users: data})
        })
        .catch((err)=>{
            console.log(err)
        })
}

exports.getUserbyName = (req, res, next) => {
    const { displayName } = req.params
    return selectUserByName(displayName)
    .then((data) => {
        res.status(200).send({user: data})
    }) 
    .catch((err) => {
        console.log(err)
    })

}

exports.postUser = (req, res, next) => {
    const {displayName, avatarURL } = req.body

    return createUser(displayName, avatarURL)
        .then((returnedUser) => {
            res.status(201).send({"user": returnedUser})
        })
        .catch((err) => {
            console.log()
        })
}

exports.getComments = (req, res, next) => {
    return selectComments()
        .then((comments)=>{
            console.log(comments)
            res.status(200).send({"comments": comments})
        })
        .catch((err)=>{
            console.log(err)
        })
}