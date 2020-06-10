const mongoose = require('mongoose');
const { User } = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Track = require('../models/trackModel');
const Album = require('../models/albumModel');
const Playlist = require('../models/playlistModel');
const Category = require('../models/categoryModel');
const Responser = require('../utils/responser');
const SearchHistory = require('../models/searchHistoryModel');

exports.searchGeneric = catchAsync(async (req, res, next) => {
  const offset = 0;
  const limit = req.query.limit * 1 || 16;
  const keyword = req.params.keyword;
  const profiles = await exports.getSearchQuery(
    'profile',
    { type: 'user' },
    keyword,
    limit,
    offset
  );
  const artists = await exports.getSearchQuery(
    'artist',
    { type: 'artist' },
    keyword,
    limit,
    offset
  );
  const tracks = await exports.getSearchQuery(
    'track',
    {},
    keyword,
    limit,
    offset,
    [
      { path: 'artist', select: 'name' },
      { path: 'album', select: 'name image' }
    ]
  );
  const albums = await exports.getSearchQuery(
    'album',
    {},
    keyword,
    limit,
    offset
  );
  const category = await exports.getSearchQuery(
    'category',
    {},
    keyword,
    limit,
    offset
  );
  // get only accessible playlists (owned playlists and public playlists)
  const playlist = await exports.getSearchQuery(
    'playlist',
    {
      $or: [
        { public: true },
        { owner: req.user ? req.user.id : mongoose.Types.ObjectId() }
      ]
    },
    keyword,
    limit,
    offset
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
  let popOptions;
  if (req.query.type === 'profile' || req.query.type === 'artist')
    additionalConditions.type = req.query.type;
  else if (req.query.type === 'playlist')
    additionalConditions.$or = [
      { public: true },
      { owner: req.user ? req.user.id : mongoose.Types.ObjectId() }
    ];
  else if (req.query.type === 'track')
    popOptions = [
      { path: 'artist', select: 'name' },
      { path: 'album', select: 'name image' }
    ];
  const features = new APIFeatures(
    exports.getSearchQuery(
      req.query.type,
      additionalConditions,
      req.query.q,
      limit,
      offset,
      popOptions
    ),
    req.query
  );

  const results = await features.query;
  res
    .status(200)
    .json(Responser.getPaging(results, req.query.type, req, limit, offset));
});

exports.getSearchHistory = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  const features = new APIFeatures(
    SearchHistory.find({ userId: req.user._id }).sort('-searchDate'),
    req.query
  ).offset();

  const results = await features.query.populate({
    path: 'context',
    select: 'name image imageUrl images icons album',
    populate: {
      path: 'album',
      select: 'image'
    }
  });
  res
    .status(200)
    .json(Responser.getPaging(results, 'history', req, limit, offset));
});

/**
 * function to get the search query for any model providing the keyword to be searched
 * @param {String} type - the model name of the collection to be searched
 * @param {Object} additionalConditions - any additional query conditions to be applied in the query
 * @param {String} keyword - the item name or part of its name
 * @param {Number} limit - maximum number of documents returned from the query
 * @param {Number} offset - index of first element in the response
 * @param {Object} popOptions - object contains what fields to be populated in the returned document
 * @returns {Query}
 */

exports.getSearchQuery = async function getSearchQuery (
  type,
  additionalConditions,
  keyword,
  limit,
  offset,
  popOptions
) {
  const Model = getModel[type];
  if (!Model) return null;
  let query = Model.find({
    name: { $regex: keyword, $options: 'i' },
    ...additionalConditions
  })
    .limit(limit)
    .skip(offset);
  if (popOptions) query = query.populate(popOptions);
  return query;
};

const getModel = {
  profile: User,
  artist: User,
  track: Track,
  album: Album,
  category: Category,
  playlist: Playlist
};
