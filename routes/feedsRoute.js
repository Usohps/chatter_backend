const express = require("express")
const router = express.Router()
const {getFeed,getAllFeeds,deleteFeed,createFeed}= require("../controllers/feedController")
router.post("/create",createFeed)
router.get("/", getAllFeeds)
router.get("/:id",getFeed)
module.exports = router