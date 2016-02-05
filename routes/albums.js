"use strict";
var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple");

var JWT_SECRET = process.env.JWT_SECRET;

var User = require('../models/user');
var Album = require('../models/album');

router.get("/:albumId", User.isLoggedIn, function(req, res, next) {
  Album.findById(req.params.albumId, function(err, album) {
    if(err) return res.send(400, err);
    res.render("albumdetails", {album: album});
  });
});

router.post("/:albumId", User.isLoggedIn, function(req, res, next) {
  Album.findById(req.params.albumId, function(err, album) {
    if(err) return res.send(400, err);
    res.send(500, "Feature not implemented");
  });
});

router.get("/", User.isLoggedIn, function(req, res, next) {
  Album.findByOwner(req.cookies.usertoken, function(err, albums) {
    if(err) res.send(400, err);
    res.render("albums", {albums: albums});
  });
});

router.post("/", function(req, res, next) {
  var albumData = req.body;
  albumData.owner = jwt.decode(req.cookies.usertoken, JWT_SECRET)._id;
  Album.findOne(req.body, function(err, album) {
    if(err) return res.send(400, err);
    if(album) return res.send(400, "An album with this name already exists");
    Album.create(albumData, function(err, savedAlbum) {
      if(err) return res.send(400, err);
      res.send(savedAlbum);
    });
  });
})

module.exports = router;
