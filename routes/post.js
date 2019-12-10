const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Message = require("../models/Messages");
const mongoose = require("mongoose");
const User = require("../models/User");

router.get("/", (req, res) => {
  Post.find({})
    .populate("owner")
    .populate("match")
    .populate("messages")
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "PostId is not valid" });
    return;
  }

  Post.findById(postId)
    .populate("owner")
    .populate("match")
    .populate("messages")
    .then(post => {
      if (!post) {
        res.status(400).json({ message: "Post not found" });
      } else res.json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/register/:id", (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  Post.findByIdAndUpdate(postId, {
    match: userId
  },
    { new: true }
  )
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

router.put("/deregister/:id", (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  Post.findByIdAndUpdate(postId, {
    match: null
  },
    { new: true }
  )
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

router.get("/new", (req, res) => {
  res.json("new");
});

router.post("/new", (req, res) => {
  console.log(req.body);
  const {
    title,
    date,
    startTime,
    endTime,
    postType,
    category,
    description
  } = req.body;

  Post.create({
    title: title,
    match: null,
    date: date,
    startTime: startTime,
    endTime: endTime,
    postType: postType,
    category: category,
    description: description,
    owner: req.user._id
  })
    .then(post => {
      res.json(post)
      return User.findByIdAndUpdate(req.user._id, {
        $push: { posts: post._id }
      }).then(() => {
        res.json({ message: "added" })
      })
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Post.findByIdAndDelete(id)
    .then(post => {
      Message.deleteMany({ _id: { $in: post.messages } }).exec(),
        User.findByIdAndUpdate(
          post.owner, {
          $pull: { posts: id }
        }).exec()
          .then(() =>
            res.json({ message: "deleted" })
          );
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.delete("/:id", (req, res) => {
//   Post.findByIdAndDelete(req.params.id)
//     .then(post => {
//       Message.deleteMany({ _id: { $in: post.messages } }).exec(),
//         User.findByIdAndUpdate(
//           post.owner, {
//           $pull: { posts: id }
//         }).exec()
//           .then(() =>
//             res.json({ message: "deleted" })
//           );
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });



module.exports = router;
