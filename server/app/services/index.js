const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.getUser = async (query) => {
  try {
    const user = await User.findOne(query).lean().exec();
    return user
  } catch ({ message }) {
    throw new Error(message)
  }
};

module.exports.createUser = async ({ email, username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      age: 23
    })
    return user.toJSON();
  } catch ({ message }) {
    throw new Error(message)
  }
};
