const Feed = require("../models/feedSchema");

const createFeed = async (req, res) => {
  try {
    const feeds = new Feed(req.body);
    await feeds.save();
  } catch (error) {
    res.status(401).json("Error creating feed");
  }
};
const getFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findById(id);
    if (feed) {
      res.status(200).json(feed);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
const getAllFeeds = async (req, res) => {
  try {
    const feed = await Feed.find({}).sort({ created_date });
    res.status(200).json(feed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFeed = async(req,res)=>{
    try {
       const {id}= req.params
       const feed = Feed.findByIdAndDelete(id)
       res.status(200).json(feed)
    } catch (error) {
        throw error
    }
}

module.exports = { createFeed, getFeed, getAllFeeds,deleteFeed };
