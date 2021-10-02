const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
});

module.exports = model('users', UserSchema)
