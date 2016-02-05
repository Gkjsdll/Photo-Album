"use strict";
var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple");

var JWT_SECRET = process.env.JWT_SECRET;

var User = require('../models/user');
var Album = require('../models/album');

router.get("/", User.isLoggedIn, function(req, res, next) {
  Album.findByOwner(req.cookies.usertoken, function(err, albums) {
    if(err) res.send(400, err);
    res.render("albums", {albums: albums});
  });
});

router.post("/", function(req, res, next) {
  console.log("Post request recieved.");
  var albumData = req.body;
  albumData.owner = jwt.decode(req.cookies.usertoken, JWT_SECRET)._id;
  console.log("User identified.");
  console.log("albumData:", albumData);
  Album.create(albumData, function(err, savedAlbum) {
    if(err) return res.send(err);
    // console.log("albums:", albums);
    res.send(savedAlbum);
  });
})

module.exports = router;
