const express = require("express");
const router = express.Router();
const Profile = require("../models/User");
const mongoose = require("mongoose");
const uploadCloud = require("./cloudinary");

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

// router.post("/profile/:id", uploadCloud.single("urlPath"), (req, res, next) => {
//   if(!req.file) {
//       next(new Error("No file uploaded!"));
//       return
//   }
//   res.json({ secure_url: req.file.secure_url });
// });

//edit profile/:id
router.put("/:id", uploadCloud.single("urlPath"), (req, res, next) => {

  Profile.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      age: req.body.age,
      urlPath:req.body.urlPath,
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

module.exports = router;
