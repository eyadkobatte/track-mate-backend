const mongoose = require('mongoose');
const ItemFile = require('./Item');
const PermissionFile = require('./Permission');

var ObjectId = mongoose.Schema.Types.ObjectId;

const RoomSchema = mongoose.Schema({
  _id: ObjectId,
  roomName: String,
  description: String,
  created: {
    uid: String,
    time: Date
  },
  permissions: [PermissionFile.PermissionSchema],
  items: [ItemFile.ItemSchema]
});

module.exports = {
  Room: mongoose.model('Room', RoomSchema),
  RoomSchema: RoomSchema
};
