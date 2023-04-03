
exports.handle404s = (req, res, next) => {
    res.status(404).send({msg: 'Not Found'})
}

exports.handle500s = (err,req,res,next) => {
    console.log('500!', err, "<<< 500")
    res.status(500).send("internal server error")
};
