const {
    selectAllUsers
} = require('../models/models')

exports.getUsers = (req, res, next) => {
    return selectAllUsers()
        .then((data) => {
            console.log(data)
            res.status(200).send({"users": data})
        })
        .catch((err)=>{
            console.log(err)
        })
}