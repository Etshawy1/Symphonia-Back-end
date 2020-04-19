const mongoose = require('mongoose');
const { User } = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Track = require('../models/trackModel');
const Album = require('../models/albumModel');
const Playlist = require('../models/playlistModel');
const Category = require('../models/categoryModel');

exports.searchGeneric = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? req.query.limit * 1 : 16;
  const profiles = await User.find({
    name: { $regex: req.params.keyword, $options: 'i' },
    type: 'user'
  }).limit(limit);
  const artists = await User.find({
    name: { $regex: req.params.keyword, $options: 'i' },
    type: 'artist'
  }).limit(limit);
  const tracks = await Track.find({
    name: { $regex: req.params.keyword, $options: 'i' }
  }).limit(limit);
  const albums = await Album.find({
    name: { $regex: req.params.keyword, $options: 'i' }
  }).limit(limit);
  const category = await Category.find({
    name: { $regex: req.params.keyword, $options: 'i' }
  }).limit(limit);
  const playlist = await Playlist.find({
    name: { $regex: req.params.keyword, $options: 'i' },
    $or: [
      { public: true },
      { owner: req.user ? req.user.id : mongoose.Types.ObjectId() }
    ]
  }).limit(limit);
  res
    .status(200)
    .json({ profiles, artists, tracks, albums, category, playlist });
});
