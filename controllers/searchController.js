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
const Responser = require('../utils/responser');

const getModel = {
  profile: User,
  artist: User,
  track: Track,
  album: Album,
  category: Category,
  playlist: Playlist
};

async function getSearchQuery (
  type,
  additionalConditions,
  keyword,
  limit,
  offset = 0
) {
  const Model = getModel[type];
  if (!Model) return null;
  return Model.find({
    name: { $regex: keyword, $options: 'i' },
    ...additionalConditions
  })
    .limit(limit)
    .skip(offset);
}

exports.searchGeneric = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 16;
  const keyword = req.params.keyword;
  const profiles = await getSearchQuery(
    'profile',
    { type: 'user' },
    keyword,
    limit
  );
  const artists = await getSearchQuery(
    'artist',
    { type: 'artist' },
    keyword,
    limit
  );
  const tracks = await getSearchQuery('track', {}, keyword, limit);
  const albums = await getSearchQuery('album', {}, keyword, limit);
  const category = await getSearchQuery('category', {}, keyword, limit);
  const playlist = await getSearchQuery(
    'playlist',
    {
      $or: [
        { public: true },
        { owner: req.user ? req.user.id : mongoose.Types.ObjectId() }
      ]
    },
    keyword,
    limit
  );
  res
    .status(200)
    .json({ profiles, artists, tracks, albums, category, playlist });
});

exports.searchType = catchAsync(async (req, res, next) => {
  if (!req.query.q) return next(new AppError('missing q query parameter', 400));
  if (!req.query.type || !getModel[req.query.type])
    return next(
      new AppError('missing type query parameter or type not supported', 400)
    );
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  const additionalConditions = {};
  if (req.query.type === 'profile' || req.query.type === 'artist')
    additionalConditions.type = req.query.type;
  else if (req.query.type === 'playlist')
    additionalConditions.$or = [
      { public: true },
      { owner: req.user ? req.user.id : mongoose.Types.ObjectId() }
    ];
  const features = new APIFeatures(
    getSearchQuery(
      req.query.type,
      additionalConditions,
      req.query.q,
      limit,
      offset
    ),
    req.query
  );

  const results = await features.query;
  res
    .status(200)
    .json(Responser.getPaging(results, req.query.type, req, limit, offset));
});
