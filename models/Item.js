const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = mongoose.Schema({
  _id: ObjectId,
  itemName: String,
  addedBy: {
    uid: String,
    time: Date
  },
  enabled: {
    type: Boolean,
    default: true
  },
  bought: {
    uid: String,
    time: Date,
    amount: Number
  },
  dues: [
    {
      uid: String,
      amount: Number
    }
  ]
});

module.exports = {
  Item: mongoose.model('Item', ItemSchema),
  ItemSchema: ItemSchema
};
