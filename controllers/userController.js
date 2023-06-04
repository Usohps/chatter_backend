const User = require("../models/userSchema");
const mongoose = require("mongoose");

const signUp = async (req, res) => {
  const { names, email, password, checkPassword } = req.body;
  const exist = await User.findOne({ email });
  try {
    if (!email || !password || !names || !checkPassword) {
      throw Error("Fill in all credentials");
    }
    if (exist) {
      throw Error("Email Already Exist");
    }
    if (password !== checkPassword) {
      throw Error("Password Does not Match try again");
    }
    if (password === checkPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
    }
  } catch (error) {
    throw error;
  }
};
