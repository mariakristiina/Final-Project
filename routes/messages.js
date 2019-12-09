const express = require("express")
const router = express.Router()
const Message = require("../models/Messages") 

router.get("/sent/:userId", (req, res) => {
  Message.find({ owner : req.params.userId})
  .populate("recipient")
  .populate("owner")
  .then(sentMsgs => {
    console.log(sentMsgs)
    res.json(sentMsgs);
  })
  .catch(err => {
    res.status(500).json(err);
  });
})

router.get("/received/:userId", (req, res) => {
  Message.find({ recipient : req.params.userId})
  .populate("recipient")
  .populate("owner")
  .then(receivedMsgs => {
  
    res.json(receivedMsgs);
  })
  .catch(err => {
    res.status(500).json(err);
  });
})


router.post("/", (req, res) => {
  const {
    title,
    content,
    subject,
    owner,
    recipient
} = req.body


Message.create({
  title: title,
  content: content,
  subject: subject,
  owner: owner,
  recipient: recipient
})
.then(message => {
  console.log(message)
  res.json(message)
})
.catch(err => {
  console.log(err);
})
})

module.exports = router;