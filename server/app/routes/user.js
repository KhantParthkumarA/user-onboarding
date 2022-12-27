const { getUser } = require("../controllers");
const { middleware } = require("../passport/user.passport");

const router = require("express").Router();

router.get("/", middleware, getUser);

module.exports = router;
