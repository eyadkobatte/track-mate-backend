var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Room = require('../models/Room').Room;
var Permission = require('../models/Permission').Permission;
var Note = require('../models/NoteItem').NoteItem;
var List = require('../models/ListItem').ListItem;
var Item = require('../models/Item').Item;
var ObjectId = mongoose.Types.ObjectId;

// 1. Get All Rooms
router.get('/', (req, res) => {
  Room.find()
    .then((rooms) => {
      console.log(rooms);
      res.status(200).json(rooms);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 2. Get Rooms Based on User UID
router.get('/u/:uid', (req, res) => {
  Room.find({
    $or: [{'created.uid': req.params.uid}, {'permissions.uid': req.params.uid}]
  })
    .then((rooms) => {
      console.log(rooms);
      res.status(200).json(rooms);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 3. Get Room based on Room id
router.get('/r/:id', (req, res) => {
  Room.findOne({_id: ObjectId(req.params.id)})
    .then((room) => {
      console.log(room);
      res.status(200).json(room);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// 4. Create new Room
router.post('', (req, res) => {
  const newRoom = new Room({
    _id: new ObjectId(),
    ...req.body,
    created: {uid: req.body.created.uid, time: new Date()}
  });
  Room.create(newRoom)
    .then((room) => {
      console.log(room);
      res.status(200).json(room);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 5. 6. (Add/Remove) Permission in Room
router.put('/:id', (req, res) => {
  const operation = req.body.operation;
  if (operation === 'ADD') {
    const permission = new Permission({
      _id: new ObjectId(),
      ...req.body,
      addedBy: {uid: req.body.addedBy.uid, time: new Date()}
    });
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.id)},
      {
        $push: {permissions: permission}
      },
      {new: true}
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else if (operation === 'REMOVE') {
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.id)},
      {
        $pull: {permissions: {_id: ObjectId(req.body._id)}}
      },
      {new: true}
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else {
    console.error('Invalid Operation');
    res.status(500).json({status: 'Invalid Operation'});
  }
});

// 7. Delete Room
router.delete('/:id', (req, res) => {
  Room.findOneAndRemove({_id: ObjectId(req.params.id)})
    .then((room) => {
      console.log(room);
      res.status(200).json(room);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 8. 9. (Add/Delete Note in Room)
router.put('/:id/note', (req, res) => {
  const operation = req.body.operation;
  if (operation === 'ADD') {
    const newNote = new Note({
      _id: new ObjectId(),
      ...req.body,
      addedBy: {uid: req.body.addedBy.uid, time: new Date()}
    });
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.id)},
      {
        $push: {noteItems: newNote}
      },
      {new: true}
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } else if (operation === 'REMOVE') {
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.id)},
      {
        $pull: {noteItems: {_id: ObjectId(req.body._id)}}
      },
      {new: true}
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else {
    console.error('Invalid Operation');
    res.status(500).json({status: 'Invalid Operation'});
  }
});

// 10. 11. (Add/Delete List in Room)
router.put('/:id/list', (req, res) => {
  const operation = req.body.operation;
  if (operation === 'ADD') {
    const newList = new List({
      _id: new ObjectId(),
      listName: req.body.listName,
      addedBy: {uid: req.body.addedBy.uid, time: new Date()},
      ...req.body
    });
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.id)},
      {
        $push: {listItems: newList}
      },
      {new: true}
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } else if (operation === 'REMOVE') {
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.id)},
      {
        $pull: {listItems: {_id: ObjectId(req.body._id)}}
      },
      {new: true}
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else {
    console.error('Invalid Operation');
    res.status(500).json({status: 'Invalid Operation'});
  }
});

// 12.13. Add/Delete item from a list in a room
router.put('/:roomId/list/:listId/item', (req, res) => {
  const operation = req.body.operation;
  if (operation == 'ADD') {
    const newItem = new Item({
      _id: new ObjectId(),
      itemName: req.body.itemName,
      addedBy: {uid: req.body.addedBy.uid, time: new Date()}
    });
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.roomId)},
      {
        $push: {'listItems.$[i].items': newItem}
      },
      {
        arrayFilters: [{'i._id': ObjectId(req.params.listId)}],
        new: true
      }
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  } else if (operation === 'REMOVE') {
    Room.findOneAndUpdate(
      {_id: ObjectId(req.params.roomId)},
      {
        $pull: {'listItems.$[i].items': {_id: ObjectId(req.body._id)}}
      },
      {
        arrayFilters: [{'i._id': ObjectId(req.params.listId)}],
        new: true
      }
    )
      .then((room) => {
        console.log(room);
        res.status(200).json(room);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  }
});

// 14. add transaction in wallet enabled list
router.put('/:roomId/list/:listId/item/:itemId/transaction', (req, res) => {
  Room.findOneAndUpdate(
    {_id: ObjectId(req.params.roomId)},
    {
      'listItems.$[i].items.$[j].bought': req.body.bought,
      $push: {'listItems.$[i].items.$[j].dues': req.body.dues}
    },
    {
      arrayFilters: [
        {'i._id': ObjectId(req.params.listId)},
        {'j._id': ObjectId(req.params.itemId)}
      ],
      new: true
    }
  )
    .then((room) => {
      console.log(room);
      res.status(200).json(room);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

module.exports = router;
