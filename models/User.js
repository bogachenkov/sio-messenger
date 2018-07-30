const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: '123456'
  },
  last_visit: {
    type: Date,
    default: Date.now
  },
  socket_id: {
    type: String
  }
})

module.exports = User = mongoose.model('User', UserSchema);