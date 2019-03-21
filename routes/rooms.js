var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Room = require('../models/Room').Room;
var Permission = require('../models/Permission').Permission;
var Note = require('../models/NoteItem').NoteItem;

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

// 8. 9. (Add/Delete Item in Room)
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
        $pull: {noteItems: ObjectId(req.body._id)}
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

module.exports = router;
