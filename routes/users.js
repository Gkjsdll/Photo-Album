var express = require('express');
var router = express.Router();
'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var User = require('../models/user');

var ref = new Firebase('https://gkjsdll-users.firebaseio.com/');

router.post('/register', function(req, res, next) {
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    User.create(userData, function(err) {
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
    });
  });
});

router.get('/profile', User.isLoggedIn, function(req, res) {
  //// logged in,   req.user
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render("login");
});

router.get('/register', function(req, res, next) {
  res.render("register");
});

module.exports = router;
