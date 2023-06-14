const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken")
const { check, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "signup": {
      //HANDLE SIGNUP
      return [
        check("email", "Invalid Email")
          .not()
          .isEmpty()
          .isEmail()
          .normalizeEmail()
          .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              throw new Error("Email already in use");
            }
          }),
        check("password", "Password is less than 4 characters")
          .isStrongPassword()
          .isLength({ min: 4, max: 16 }),
        check("names", "Name feild is empty").not().isEmpty(),
      ];
    }
    case "login": {
      //HANDLE LOGIN
      return [
        check("email", "Email Does not exist")
          .not()
          .isEmpty()
          .isEmail()
          .normalizeEmail()
          .custom(async (email) => {
            try {
              const existingUser = await User.findOne({ email });
              if (!existingUser) {
                throw new Error("Invalid user");
              }
              return existingUser;
            } catch (error) {
              throw error;
            }
          }),
        check("password")
          .not()
          .isEmpty().withMessage("input password")
          .isLength({ min: 4, max: 16 }).withMessage("password less than 4 chars"),
      ];
    }
  }
};
//generate user token 
const createToken = (id)=>{
 return token.sign({id},process.env.SECRET,{expiresIn:"2d"})
}
const signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { names, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let user = await User.create({ names, email, password: hash });
    const token = createToken(user._id)
    user = await User.create({ names, email, password: hash})
    return res.status(200).json({names,password:hash,email,token});
  } catch (error) {
    res.status(400).json({ error: error.message });
    throw next(error);
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const userPassword = await bcrypt.compare(password, user.password);
      const token = createToken(User._id)
      if (!userPassword) {
        res.status(400).json({ msg: "Incorrect password" });
      }
      if (!user && !userPassword) {
        res.status(400).json({ msg: "Invalid credentials" });
      }
      return res.status(200).json({user,token});
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { signUp, validate, login };
