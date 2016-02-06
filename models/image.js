'use strict';

var mongoose = require('mongoose');

var AWS = require("aws-sdk");
var uuid = require("node-uuid");
var s3 = new AWS.S3();
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

var JWT_SECRET = process.env.JWT_SECRET;

var Album = require('../models/album');

var Image;

var imageSchema = mongoose.Schema({
  title: { type: String },
  url: { type: String }
  // automatically gets _id, which is a unique mongo id
});

imageSchema.statics.newImg = function (req, res, next) {
  var match = req.file.originalname.match(/\.\w+$/)[0];
  var ext = match ? match : '';
  
  var key = uuid.v1() + ext;

  var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: req.file.buffer
    };

  s3.putObject(params, function(err, data) {
    if(err) return res.status(400).send(err);

    var url = `${process.env.AWS_URL}${process.env.AWS_BUCKET}/${key}`;
    console.log("url:", url);
    var image = new Image({
      filename: req.file.originalname,
      url: url
    });
    image.save(function(err, savedImage) {
        if(err) res.status(400).send();
    });

    Album.findById(req.cookies.currAlbum, function(err, album) {
      if(err) return res.status(400).send(err);
      album.images.push(image);
      album.save(function(err, savedAlbum) {
        if(err) return res.status(400).send(err);
        res.redirect(`/albums/${req.cookies.currAlbum}`);
      });
    });
  });


}

Image = mongoose.model('Image', imageSchema);

module.exports = Image;
