const mongoose = require('mongoose');
const NoteItemFile = require('./NoteItem');
const ListItemFile = require('./ListItem');
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
  noteItems: [NoteItemFile.NoteItemSchema],
  listItems: [ListItemFile.ListItemSchema],
});

module.exports = {
  Room: mongoose.model('Room', RoomSchema),
  RoomSchema: RoomSchema
};
