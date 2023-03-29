const {
    selectAllUsers,
    selectUserByName,
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
    const {displayName, avatarUrl } = req.body
    return createUser(sentUser)
        .then((returnedUser) => {
            res.status(201).send(returnedObj)
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