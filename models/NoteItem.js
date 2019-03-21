const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const NoteItemSchema = mongoose.Schema({
  _id: ObjectId,
  value: String,
  addedBy: {
    uid: String,
    time: Date
  }
});

module.exports = {
  NoteItem: mongoose.model('NoteItem', NoteItemSchema),
  NoteItemSchema: NoteItemSchema
};
