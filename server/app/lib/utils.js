const jwt = require("jsonwebtoken")

const secret = 'secret'

module.exports.encode = (data) => {
    return jwt.sign(data, secret); // { expiresIn: '1h' }
}

module.exports.decode = (token) => {
    return jwt.verify(token, secret); // { expiresIn: '1h' }
}

module.exports.errorHandler = (err, req, res, next) => {
    // console.error()
    res.status(500).send({ status: false, data: null, error: err.stack })
}