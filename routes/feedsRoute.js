const express = require("express")
const router = express.Router()
const {getFeed,getAllFeeds,deleteFeed,createFeed,updateFeed}= require("../controllers/feedController")
router.post("/create",createFeed)
router.get("/", getAllFeeds)
router.get("/:id",getFeed)
router.post("/:id",deleteFeed)
router.patch("/:id",updateFeed)
module.exports = router