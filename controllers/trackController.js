const Track = require('./../models/trackModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync').threeArg;
const UploadBuilder = require('../utils/uploader').UploadBuilder;

exports.getTrack = factory.getOne(Track, [
  { path: 'album', select: 'name image' },
  { path: 'category', select: 'name' },
  { path: 'artist', select: 'name' }
]);
exports.getSeveralTacks = factory.getMany(Track, [
  { path: 'album', select: 'name' },
  { path: 'category', select: 'name' },
  { path: 'artist', select: 'name' }
]);

exports.multiPart = catchAsync(async (req, res, next) => {
  let uploadBuilder = new UploadBuilder();
  uploadBuilder.addfileField('track');
  uploadBuilder.addTypeFilter('audio/mpeg');
  uploadBuilder.constructUploader(true)(req, res, next);
});

exports.addTrack = catchAsync(async (req, res, next) => {
  console.log(req.files.track[0].buffer);
  res.status(200).json({ nice: 'nikka' });
});
