const userSchema = require("../models/userSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt")

const signUp = async (req, res) => {
  const { names, email, password } = req.body;
  const exist = await User.findOne({ email });
  // HARSH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await  User.create({names,email,password:hash})
  console.log(user)
  try {
    if (!email || !password || !names) {
      throw Error("Fill in all credentials");
    }
    if (exist) {
      throw Error("Email Already Exist");
    }
    if(names && email && password){
      res.status(200).json("Sucessful Signup")
    return user
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
    throw error;
  }
};

const login = async(req,res)=>{

const {email,password}= req.body
const user = await userSchema.findOne({email})
const userPassword = await bcrypt.compare(password,user.password)

try {
  if(!user){
    throw Error ("Email does not exist")
  }
  if(!userPassword){
    throw Error("Incorrect Password")
  }
  if(!user && !userPassword){
    throw Error ("Incorrect user and Password")
  }
} catch (error) {
  res.status(400).json(error)
  console.log(error)
  throw error
}

}
module.exports = {signUp,login}