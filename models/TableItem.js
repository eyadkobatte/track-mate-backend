const mongoose = require('mongoose');
const ItemFile = require('./Item');

var ObjectId = mongoose.Schema.Types.ObjectId;

const TableItemSchema = mongoose.Schema({
  _id: ObjectId,
  addedBy: {
    uid: String,
    time: Date
  },
  items: [ItemFile.ItemSchema]
});

module.exports = {
  TableItem: mongoose.model('TableItem', TableItemSchema),
  TableItemSchema: TableItemSchema
};
