const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = mongoose.Schema({
  _id: ObjectId,
  uid: String,
  displayName: String,
  photoURL: String,
  createdOn: Date,
  email: String
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserSchema: UserSchema
};
