const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: String,
    date: {
      type: Date,
      default: Date.now
    },
    startTime: String,
    endTime: String,
    postType: {
      type: String,
      enum: ["search", "offer"],
      default: "search"
    },

    // postTypeDe: {
    //   type: String,
    //   enum: ["suchen", "anbieten"]
    // },
    category: {
      type: String,
      enum: [
        "language lessons",
        "tutoring",
        "government appointment",
        "doctor appointment",
        "meet people",
        "activities for kids",
        "activities for seniors"
      ],
      default: "language lessons"
    },
    // categoryDE: {
    //   type: String,
    //   enum: ["Sprachunterricht", "Nachhilfe", "Behördentermin", "Arzttermin", "Leute kennenlernen", "Angebote für Kinder", "Angebote für Senioren"]
    // },
    description: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    match: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: []
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
