const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  age: String,
  siteLanguage: {
    type: String,
    default: "English"
  },
  urlPath: {
    type: String,
    default: "https://res.cloudinary.com/mariakristiina/image/upload/v1575542831/avatar-orange_q8rkfz.png",
  },
  gender: {
    type: String,
    enum: ["select", "diverse", "female", "male"],
    default: "select"
  },
  // genderDE: {
  //   type: String,
  //   enum: ["divers", "weiblich", "männlich"]
  // },
  languages: [],
  role: {
    type: String,
    enum: ["admin", "private", "company"],
    default: "private"
  },
  // roleDe: {
  //   type: String,
  //   enum: ["admin", "privat", "firma"],
  //   default: "privat"
  // },
  about: {
    type: String,
    default: "Write something about yourself" },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: "Post"
    }],
    messages: [{
      type: Schema.Types.ObjectId,
      ref: "Messages"
    }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
