const { User } = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const { Track } = require('../models/trackModel');

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

exports.artistTopTracks = catchAsync(async (req, res, next) => {
  req.query.fields = 'tracks';
  const features = new APIFeatures(
    User.findById(req.params.id).sort({ usersCount: -1 }),
    req.query
  )
    .filter()
    .limitFields()
    .paginate();
  const topTracks = await features.query.populate({
    path: 'tracks',
    model: 'Track',
    populate: {
      path: 'album',
      model: 'Album'
    }
  });
  topTracks[0].tracks.forEach((item, index) => {
    item.previewUrl = item.getPreviewUrl(
      `${req.protocol}://${req.get('host')}/`
    );
  });

  res.status(200).json(topTracks);
});
