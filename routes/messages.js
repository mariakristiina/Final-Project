const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");
const Post = require("../models/Post");
router.get("/:userId", (req, res) => {
  Message.find({
    $or: [{ owner: req.params.userId }, { recipient: req.params.userId }]
  })
    .populate("recipient")
    .populate("owner")
    .populate("subject")
    .then(sentMsgs => {
      res.json(sentMsgs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/*router.get("/received/:userId", (req, res) => {
  Message.find({ recipient: req.params.userId })
    .populate("recipient")
    .populate("owner")
    .populate("subject")

    .then(receivedMsgs => {
      console.log("TEST2", receivedMsgs[0]);
      res.json(receivedMsgs);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});
*/

router.post("/", (req, res) => {
  const { content, subject, owner, recipient } = req.body;

  Message.create({
    content: content,
    subject: subject,
    owner: owner,
    recipient: recipient
  })
    .then(message => {
      res.json(message);
      Post.findByIdAndUpdate(
        { _id: message.subject._id },
        { $push: { messages: message._id } }
      );
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/detail/:id", (req, res) => {
  Post.findById({ _id: req.params.id })
    .populate("owner")
    .populate("match")
    .populate("messages")
    .then(post => res.json(post))
    .catch(err => console.log(err));

  // Message.findById({ _id: req.params.id })
  // .populate("recipient")
  // .populate("owner")
  // .populate("subject").then(response => {
  //   res.json(response)
  // }).catch(err => {
  //   console.log(err);
  // })
});
module.exports = router;
