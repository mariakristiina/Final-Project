const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  image: String,
  age: Number,
  genderEn: {
    enum: ["diverse", "female", "male"]
  },
  genderDE: {
    enum: ["divers", "weiblich", "männlich"]
  },
  languages: {
    enum: []
  },
  roleEn: {
    type: String,
    enum: ["admin", "seeking", "volunteer", ""]
  },
  roleDe: {
    type: String,
    enum: ["admin", "auf der Suche", "freiwillig", ""]
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
