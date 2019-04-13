const mongoose = require('mongoose');
const ItemFile = require('./Item');

var ObjectId = mongoose.Schema.Types.ObjectId;

const WalletItemSchema = mongoose.Schema({
  _id: ObjectId,
  wallet: {
    uid: String,
    amount: Number
  },
  transactions: [
    {
      uid: String,
      amount: Number,
      payee: String,
      date: Date
    }
  ],
  items: [ItemFile.ItemSchema]
});

module.exports = {
  WalletItem: mongoose.model('WalletItem', WalletItemSchema),
  WalletItemSchema: WalletItemSchema
};
