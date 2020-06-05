const Category = require('../models/categoryModel');
const Track = require('../models/trackModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const Responser = require('../utils/responser');

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
 * @summary all it does is to return some random recommended tracks tracks
 */
module.exports.getRecommendedTracks = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  req.query.sort = 'category';
  const features = new APIFeatures(
    Track.find({
      _id: { $nin: req.user.followedTracks }
    }),
    req.query
  ).offset();

  let tracks = await features.query.populate([
    {
      path: 'artist',
      select: 'name'
    },
    {
      path: 'album',
      select: 'name image'
    }
  ]);

  res
    .status(200)
    .json(Responser.getPaging(tracks, 'tracks', req, limit, offset));
});
