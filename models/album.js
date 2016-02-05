'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var Album = require('../models/album');

var JWT_SECRET = process.env.JWT_SECRET;

var Album;

var albumSchema = mongoose.Schema({
  title: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  }]
  // automatically gets _id, which is a unique mongo id
});

albumSchema.statics.findByOwner = function (usertoken, cb) {
  var user = jwt.decode(usertoken, JWT_SECRET)._id;
  Album.find({owner: user}, function(err, albums) {
    if(err) return cb(err);
    console.log("Found albums:", albums);
    cb(null, albums);
  });
}

Album = mongoose.model('Album', albumSchema);

module.exports = Album;
