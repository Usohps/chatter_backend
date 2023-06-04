const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    names:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required: true,
    },
    checkPassword:{
        type:String,
        required:true,
    }
})