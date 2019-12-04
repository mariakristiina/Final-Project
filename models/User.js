const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  image: {
    data: Buffer,
    contentType: String
  },
  age: Date,
  genderEn: {
    type: String,
    enum: ["diverse", "female", "male"]
  },
  genderDE: {
    type: String,
    enum: ["divers", "weiblich", "männlich"]
  },
  languages: String,
  roleEn: {
    type: String,
    enum: ["admin", "private", "company"],
    default: "private"
  },
  roleDe: {
    type: String,
    enum: ["admin", "privat", "firma"],
    default: "privat"
  },
  about: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
