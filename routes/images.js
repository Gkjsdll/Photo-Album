"use strict";
var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

var User = require('../models/user');
var Image = require('../models/image');

router.post('/', User.isLoggedIn, upload.single('image'), Image.newImg, function(req, res) {
  res.redirect('/albums');
});

module.exports = router;
