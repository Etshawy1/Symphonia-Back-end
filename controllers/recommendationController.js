const Category = require('../models/categoryModel');
const { Track } = require('../models/trackModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');

/**
 * @summary right now all it does is to return in the request all the names of the available genres
 */
module.exports.getAvailabeGenreSeed = catchAsync(async (req, res, next) => {
  myCats = await Category.find({}).select('-_id -href');

  let catNames = [];
  myCats.forEach(element => {
    catNames.push(element.id);
  });

  res.status(200).json({
    genres: catNames
  });
});

/**
 * @summary all it does is to some random tracks
 */
module.exports.getRecommendedTracks = catchAsync(async (req, res, next) => {
  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const features = new APIFeatures(Track.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();
  features.query.populate({ path: 'artist', select: 'name type ' });

  let tracks = await features.query;

  res.status(200).json({
    tracks: tracks
  });
});
