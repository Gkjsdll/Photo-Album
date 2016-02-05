'use strict';

var mongoose = require('mongoose');

var Image = require('../models/image');

var Image;

var imageSchema = mongoose.Schema({
  title: { type: String },
  url: { type: String }
  // automatically gets _id, which is a unique mongo id
});

Image = mongoose.model('Image', imageSchema);

module.exports = Image;
