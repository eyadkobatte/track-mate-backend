const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const PermissionSchema = mongoose.Schema({
  _id: ObjectId,
  uid: String,
  addedBy: {
    uid: String,
    time: Date
  },
  level: Number
});

module.exports = {
  Permission: mongoose.model('Permission', PermissionSchema),
  PermissionSchema: PermissionSchema
};
