const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  age: Number,
  gender: {
    type: String,
    enum: ["select", "diverse", "female", "male"],
    default: "select"
  },
  // genderDE: {
  //   type: String,
  //   enum: ["divers", "weiblich", "männlich"]
  // },
  languages: String,
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
    default: "Write something about yourself" }
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
