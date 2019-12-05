const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("./cloudinary");

router.post("/profile/:id", uploadCloud.single("urlPath"), (req, res, next) => {
    if(!req.file) {
        next(new Error("No file uploaded!"));
        return
    }
    res.json({ secure_url: req.file.secure_url });
});



module.exports = router;