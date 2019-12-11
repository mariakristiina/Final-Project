const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

router.get("/sent/:userId", (req, res) => {
  Message.find({
    $or: [{ owner: req.params.userId }, { recipient: req.params.userId }]
  })
    .populate("recipient")
    .populate("owner")
    .populate("subject")
    .populate("comments")
    .then(sentMsgs => {
      res.json(sentMsgs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  const { content, subject, owner, recipient } = req.body;

  Message.create({
    content: content,
    subject: subject,
    owner: owner,
    recipient: recipient
  })
    .then(message => {
      // res.json(message)
      Post.findByIdAndUpdate(subject, {
        $push: { messages: message._id }
      })
        .exec()

        // ,User.findByIdAndUpdate(owner, {
        //   $push: { messages: message._id }
        // }).exec(),

        // User.findByIdAndUpdate(recipient, {
        //   $push: { messages: message._id }
        // }).exec()

        .then(() => {
          res.json({ message: "message added" });
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/add", (req, res) => {
  const { id, content, subject, owner, recipient } = req.body;
  console.log("CONTENTTTTT", content);
  Comment.create({
    content: content,
    subject: subject,
    owner: owner,
    recipient: recipient
  })
    .then(comment => {
      // res.json(message)
      Message.findByIdAndUpdate(id, {
        $push: { comments: comment._id }
      }).exec(),
        Post.findByIdAndUpdate(subject, {
          $push: { messages: comment._id }
        })
          .exec()

          // ,User.findByIdAndUpdate(owner, {
          //   $push: { messages: comment._id }
          // }).exec(),

          // User.findByIdAndUpdate(recipient, {
          //   $push: { messages: comment._id }
          // }).exec()
          .then(message => {
            res.json(message);
          });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/detail/:id", (req, res) => {
  Message.findById({ _id: req.params.id })
    .populate("recipient")
    .populate("owner")
    .populate("subject")
    .populate("comments")
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Message.findByIdAndDelete(id)
    .then(message => {
      return Post.findByIdAndUpdate(message.subject, {
        $pull: { messages: id }
      }).then(() => res.json({ message: "deleted" }));
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
