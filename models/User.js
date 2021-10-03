const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  messagesSent: {
    type: Number,
    default: 0
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('users', UserSchema)
