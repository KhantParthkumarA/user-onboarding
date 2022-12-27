const { getUser } = require("../services");
const { decode } = require("../lib/utils")

module.exports.middleware = async (req, res, next) => {
    if (!req.headers['x-access-token']) {
        return next(new Error('Access token is missing'));
    }
    const decodeToken = decode(req.headers['x-access-token'])
    const user = await getUser({ _id: decodeToken._id })
    if (!user) {
        return next(new Error('User does not exists'));
    }
    req.user = user;
    next();
}
