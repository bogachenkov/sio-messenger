const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arrayLimit = val => {
  return val.length <= 2;
}

const ChatSchema = new Schema({
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    last_seen: {
      type: Date,
      default: Date.now
    }
  }],
  messages: [{
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    time: {
      type: Date,
      default: Date.now
    },
    text: {
      type: String
    }
  }],
  _updated: {
    type: Date,
    default: Date.now
  }
})



module.exports = Chat = mongoose.model('Chat', ChatSchema);