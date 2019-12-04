const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = ({
  title: String,
  content: String,
  subject: {
    type: Schema.Types.ObjectId,
    ref: Post
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;