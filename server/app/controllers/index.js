const User = require("../models/userModel");
const userService = require("../services");
const bcrypt = require("bcrypt");
const { encode } = require("../lib/utils");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const user = await userService.getUser({ username });
    console.log(user)
    if (!user)
      return res.json({ msg: "Incorrect Username", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });

    delete user.password;
    const token = encode({ _id: user._id })
    return res.json({ status: true, data: { token, ...user } });

  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const user = await userService.createUser({
      email,
      username,
      password,
    });
  
    delete user.password
    return res.json({ status: true, data: { ...user } });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = req.user;
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

