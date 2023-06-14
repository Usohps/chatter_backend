const Feed = require("../models/feedSchema");

const createFeed = async (req, res) => {
  try {
    const feeds = new Feed(req.body);
    await feeds.save();
    res.status(200).json({message:"Sucessful", feeds})
  } catch (error) {
    res.status(401).json("Error creating feed");
  }
};
const getFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findById(id);
    if (!feed) {
      res.status(400).json({message:"feed not found"})
    }
    res.status(200).json({mesaage:"Success", feed})
  } catch (error) {
    console.log(error.message);
   throw res.status(404).json({ message: error.message });
  }
};
const getAllFeeds = async (req, res) => {
  try {
    const feed = await Feed.find({}).sort({ createdAt: -1 });
    res.status(200).json(feed);
  } catch (error) {
    console.log(error)
   throw res.status(400).json({ error:"Cannot get feeds" });
  }
};

const deleteFeed = async(req,res)=>{
    try {
       const {id}= req.params
       const feed = Feed.findByIdAndDelete(id)
       res.status(200).json({mesaage:"Deleted Successfully",feed})
    } catch (error) {
        throw error
    }
}

const updateFeed = async(req,res)=>{
  try {
    const {title,content} = req.body
    const {id} = req.params
    const feed = await Feed.findById(id)
    if(!feed){
      res.status(400).json("Not found")
    }
    feed.set("title",title)
    feed.set("content",content)
    await feed.save()
    res.status(201).json({message:"Update Successful",data:feed})
  } catch (error) {
    throw error
  }
}

module.exports = { createFeed, getFeed, getAllFeeds,deleteFeed,updateFeed };
