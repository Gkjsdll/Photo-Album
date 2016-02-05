'use strict';
var express = require('express');
var router = express.Router();

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var User = require('../models/user');

var ref = new Firebase('https://gkjsdll-users.firebaseio.com/');

router.post('/register', function(req, res, next) {
  console.log("Attemping to create user in firebase...");
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    console.log("Created user in firebase:", userData);
    var userInfo = {
      firebaseId: userData.uid,
      email: req.body.email
    }
    console.log("Attemping to create user in mongo:", userInfo);
    User.create(userInfo, function(err) {
      if(err) return res.status(400).send(err);
      console.log("User creation successful");
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  console.log("Attemping Firebase auth...");
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);
    console.log("Looking for user in mongo...");
    User.findOne({firebaseId: authData.uid}, function(err, user) {
      if(err) return res.status(400).send(err);
      if(!user) return res.status(400).send("User not found (Mongo).");
      var token = user.generateToken();
      res.cookie('usertoken', token).send();
    });
  });
});

router.get('/profile', User.isLoggedIn, function(req, res) {
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    if(err) return res.status(400).send(err);
    res.send(user);
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});
module.exports = router;
