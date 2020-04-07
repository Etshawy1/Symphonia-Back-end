const { User } = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getArtist = factory.getOne(User);
exports.getSeveralArtists = factory.getMany(User);
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

exports.ArtistFollowers = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const followers = await User.find({
    followedUsers: { $elemMatch: { $eq: req.params.id } }
  }).select('-queue');

  res.status(200).json({
    followers,
    followers_count: followers.length
  });
});
