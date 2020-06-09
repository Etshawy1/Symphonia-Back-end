const { User } = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Track = require('../models/trackModel');
const Email = require('../utils/email');
const crypto = require('crypto');
const Album = require('../models/albumModel');
const Responser = require('../utils/responser');

exports.getSeveralArtists = factory.getMany(User);
exports.getArtist = catchAsync(async (req, res, next) => {
  const artist = await User.findById(req.params.id);
  if (!artist) {
    return next(new AppError('that document does not exist', 404));
  }
  const followersCount = await User.find({
    followedUsers: { $elemMatch: { $eq: req.params.id } }
  }).count();

  res.status(200).json({
    ...artist._doc,
    followersCount
  });
});
exports.relatedArtists = catchAsync(async (req, res, next) => {
  const artist = await User.findById(req.params.id);
  if (!artist || artist.type !== 'artist') {
    return next(new AppError('that artist does not exist', 404));
  }
  const artists = await User.aggregate([
    { $match: { type: 'artist' } },
    { $sample: { size: 3 } }
  ]);
  res.status(200).json({
    artists
  });
});

exports.artistFollowers = catchAsync(async (req, res, next) => {
  const followers = await User.find({
    followedUsers: { $elemMatch: { $eq: req.params.id } }
  }).select('-queue');

  res.status(200).json({
    followers,
    followers_count: followers.length
  });
});

exports.artistTopTracks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Track.find({ artist: req.params.id }),
    req.query
  ).offset();
  const topTracks = await features.query.populate([
    { path: 'artist', select: 'name' },
    { path: 'album', select: 'name image' }
  ]);
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  res
    .status(200)
    .json(Responser.getPaging(topTracks, 'tracks', req, limit, offset));
});

exports.getArtistAlbums = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Album.find({
      artist: req.params.id
    }),
    req.query
  )
    .filter()
    .offset();

  const albums = await features.query.populate([
    { path: 'artist', select: 'name' },
    { path: 'tracks', select: 'name' }
  ]);
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  res
    .status(200)
    .json(Responser.getPaging(albums, 'albums', req, limit, offset));
});
