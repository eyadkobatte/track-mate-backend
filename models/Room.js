const mongoose = require('mongoose');
const NoteItemFile = require('./NoteItem');
const ListItemFile = require('./ListItem');
const WalletListFile = require('./WalletItem');
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
  walletListItems: [WalletListFile.WalletItemSchema]
});

module.exports = {
  Room: mongoose.model('Room', RoomSchema),
  RoomSchema: RoomSchema
};
