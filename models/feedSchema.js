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
        types:Number,
    },
    comment:{
        type: String,
        
    }
})
module.exports =  mongoose.model("feeds",feedSchema)