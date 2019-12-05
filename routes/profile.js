const express = require("express");
const router = express.Router();
const Profile = require("../models/User");
const mongoose = require("mongoose");


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

//edit profile/:id
router.put("/:id", (req, res) => {
  Profile.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      image: req.body.image,
      age: req.body.age,
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