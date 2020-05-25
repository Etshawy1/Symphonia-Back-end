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

exports.artistFollowers = catchAsync(async (req, res, next) => {
  const followers = await User.find({
    followedUsers: { $elemMatch: { $eq: req.params.id } }
  }).select('-queue');

  res.status(200).json({
    followers,
    followers_count: followers.length
  });
});
exports.applyArtist = catchAsync(async (req, res, next) => {
  // 2) Generate the random reset token
  const user = await User.findById(req.user._id);
  if (user.type == 'artist') {
    return next(new AppError('you are already an artist', 400));
  }
  const applicationToken = user.createArtistToken();
  await user.save({
    validateBeforeSave: false
  });
  try {
    const resetURL =
      `${req.protocol}://${req.hostname}` +
      `/api/v1/artists/${applicationToken}`;
    await new Email(user, resetURL).sendArtistApplication();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.artistApplicationToken = undefined;
    user.artistApplicationExpires = undefined;
    await user.save({
      validateBeforeSave: false
    });
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});
exports.confirmApplication = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    artistApplicationToken: hashedToken,
    artistApplicationExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.type = 'artist';
  user.artistApplicationToken = undefined;
  user.artistApplicationExpires = undefined;
  await user.save();
  res.status(200).json({ user });
});

exports.artistTopTracks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Track.find({ artist: req.params.id }),
    req.query
  )
    .filter()
    .sort()
    .offset();
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
    .sort()
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
