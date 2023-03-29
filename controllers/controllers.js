const {
    selectAllUsers, 
    selectUserByName,
    createUser
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
            console.log(err)
        })
}