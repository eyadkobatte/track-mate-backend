const mongoose = require('mongoose');
const ItemFile = require('./Item');

var ObjectId = mongoose.Schema.Types.ObjectId;

const ListItemSchema = mongoose.Schema({
  _id: ObjectId,
  addedBy: {
    uid: String,
    time: Date
  },
  items: [ItemFile.ItemSchema]
});

module.exports = {
  ListItem: mongoose.model('ListItem', ListItemSchema),
  ListItemSchema: ListItemSchema
};