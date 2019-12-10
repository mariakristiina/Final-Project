const express = require("express");
const router = express.Router();
const Profile = require("../models/User");
const mongoose = require("mongoose");
const uploadCloud = require("./cloudinary");
const Post = require("../models/Post")
const Messages = require("../models/Messages")

//get profile/:id
router.get("/:id", (req, res) => {
  const profileId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "ProfileId is not valid" });
    return;
  }

  Profile.findById(profileId)
    .then(profile => {
      if (!profile) {
        res.status(404).json({ message: "User profile not found" });
      } else res.json(profile);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/language", (req, res) => {
  Profile.findByIdAndUpdate(
    req.user._id,
    {
      siteLanguage: req.body.siteLanguage
    },
    { new: true }
  )
    .then(language => {
      res.json(language);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.put("/:id", uploadCloud.single("urlPath"), (req, res, next) => {
  Profile.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      age: req.body.age,
      urlPath: req.body.urlPath,
      gender: req.body.gender,
      languages: req.body.languages,
      about: req.body.about
    },
    { new: true }
  )
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Profile.findByIdAndDelete(id)
  // .populate("posts")
  // .populate("messages")
    .then(user => {
      Post.deleteMany({ _id: { $in: user.posts } }).exec()/* ,
        Messages.deleteMany({ _id: { $in: user.posts.messages } }).exec() */
        .then((() => {
          res.json({ message: "deleted" })
        }))
    })
    .catch(err => {
      res.status(500).json(err);
    })
})


module.exports = router;
