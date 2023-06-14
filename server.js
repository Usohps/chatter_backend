//require the following installed dependencies, express, mongoose,cors,dotenv
// const expressValidator = require("express-validator")
const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const mongoose  = require("mongoose")
require("dotenv").config()

// require/import the various route as created in your route folder.
const userRoute = require("./routes/userRoute");
const feedRoute = require("./routes/feedsRoute")
mongoose.set("strict",false)

//Instantiate/Initiate Express to a constant to aid application of the use method 
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/user",userRoute)
app.use("/api/feed",feedRoute)
// app.use(expressValidator())
app.use(bodyParser.json())


const mongoDB = "mongodb://127.0.0.1:27017/ChatterDB"; 

const start = async () =>{
    try {
      await mongoose.connect(mongoDB)
      app.listen(process.env.PORT, () => {
        console.log(
          `I am connected to ${mongoDB} and listening on port`,
          process.env.PORT
        );
      }); 
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()

