const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = ({
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  startTime: Number,
  endTime: Number,
  postTypeEn: {
    type: String,
    enum: ["search", "offer"]
  },
  postTypeDe: {
    type: String,
    enum: ["suchen", "anbieten"]
  },
  categoryEn: {
    type: String,
    enum: ["language lessons", "tutoring", "government appointment", "doctor appointment", "meet people", "activities for kids", "activities for seniors"]
  },
  categoryDE: {
    type: String,
    enum: ["Sprachunterricht", "Nachhilfe", "Behördentermin", "Arzttermin", "Leute kennenlernen", "Angebote für Kinder", "Angebote für Senioren"]
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  match: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


const Post = mongoose.model('Post', postSchema);
module.exports = Post;