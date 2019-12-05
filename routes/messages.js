const express = require("express")
const router = express.Router();
const Message = require("../models/Message")

router.post("/postDetail/messages", (req, res, next) => {
  const {content,title,subjectId} = req.body;
  const owner = req.user._id

  Message.create({
    content,
    owner
  })
  .then(message => {
    return this.post.findOneAndUpdate(
    {_id: req.params.postDetail},
  {
     
    },
    {
      new: true
    }
  )
  
  .populate({
    path: "messages",
    populate: {
      path: "author"
    }
  })
  .then(post => {
    res.json(post.message)
  })
})
.catch(err => {
  next(err)
})
})

module.exports = router;