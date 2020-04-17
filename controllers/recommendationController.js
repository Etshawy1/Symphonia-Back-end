const Category = require('../models/categoryModel');
const Track = require('../models/trackModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const Helper = require('../utils/helper');
/**
 * @module recommendationController
 */

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
  const { limit, offset } = Helper.getPageMeta(req);
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
