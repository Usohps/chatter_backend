const mongoose = require("mongoose")
const Schema = mongoose.Schema
const feedSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required:true
    },
    image:{
        type:String,
        required: false
    },
    likes:{
        type: Number,
        default:0
    },
    featured:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
})
module.exports =  mongoose.model("feeds",feedSchema)