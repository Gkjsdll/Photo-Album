"use strict";
var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple");

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });


var JWT_SECRET = process.env.JWT_SECRET;

var User = require('../models/user');

router.post('/', User.isLoggedIn, upload.array('images'), function(req, res) {
  console.log('req.files:', req.files);
  res.redirect('/');
});

router.post("/", function(req, res, next) {

})

module.exports = router;
