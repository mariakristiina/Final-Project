const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret
  });

 const storage = cloudinaryStorage({
     cloudinary,
     folder: "profileImages",
     allowedFormats: ["jpg", "png"],
     transformation: [
         {
             width: 150,
             height: 150,
             crop: "thumb",
             gravity: "face",
             background: "white"
         }
     ],
     filename: function(req, res, cb) {
         cb(null, res.originalname);
     }
 }) 

 const uploadCloud = multer({storage});
 module.exports = uploadCloud;