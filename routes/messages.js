const express = require("express");
const router = express.Router();
const Message = require("../models/Messages");
const Post = require("../models/Post");

router.get("/sent/:userId", (req, res) => {
  Message.find({ owner: req.params.userId })
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

router.get("/received/:userId", (req, res) => {
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
return Post.findByIdAndUpdate(subject, {
        $push: { messages: message._id }
      }).then(() => {
        res.json({ message: "message added" })
      })
    })
    .catch(err => {
      console.log(err);
    });
});



router.get('/detail/:id', (req, res) => {
  Message.findById({ _id: req.params.id }).populate("recipient")
    .populate("owner")
    .populate("subject").then(response => {
      res.json(response)
    }).catch(err => {
      console.log(err);
    })


})


router.delete("/:id", (req, res) => {
  const id = req.params.id

  Message.findByIdAndDelete(id)
    .then(message => {
      return Post.findByIdAndUpdate(message.subject, {
        $pull: { messages: id }
      }).then(() =>
        res.json({ message: "deleted" })
      );
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;
