const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Message = require("../models/Message");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    Post.find({})
    .populate("owner", "match", "messages")
    .then(posts => {
        res.json("post");
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    const postId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: "PostId is not valid"});
        return;
    }

    Post.findById(postId)
    .populate("owner", "match", "messages")
    .then(post => {
        if(!post) {
            res.status(400).json({ message: "Post not found" });
        } else res.json(project);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get("/new", (req, res) => {
    res.json("new")
});

router.post("/new", (req, res) => {
Post.create({
    title: req.body.title,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    postType: req.body.postType,
    category: req.body.category,
    description: req.body.description,
    owner: req.user._id,
})
.then(post => {
    res.json(post);
})
.catch(err => {
    res.status(500).json(err);
});
});

router.delete("/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(post => {
        return Message.deleteMany({_id: {$in: post.messages} })
        .then(() => 
        res.json({ message: "deleted"})
        );
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;