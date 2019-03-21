var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;
var User = require('../models/User').User;

// 10. Create New User
router.post('/', (req, res) => {
  const newUser = new User({
    _id: new ObjectId(),
    ...req.body,
    createdOn: new Date()
  });
  User.create(newUser)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 11. Get List of Users
router.post('/list', (req, res) => {
  const usersToFind = req.body.usersToFind;
  User.find({uid: {$in: usersToFind}})
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 12. Get user from email id
router.post('/email', (req, res) => {
  const email = req.body.email;
  User.findOne({email: email})
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500) > json(error);
    });
});

// 13. Get User from uid
router.post('/uid', (req, res) => {
  const uid = req.body.uid;
  User.findOne({uid: uid})
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// 14. Delete User
router.delete('/:id', (req, res) => {
  res.send('not configured');
});

module.exports = router;
