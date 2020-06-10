const Track = require('./../models/trackModel');
const { User } = require('../models/userModel');
const Album = require('../models/albumModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync').threeArg;
const UploadBuilder = require('../utils/uploader').UploadBuilder;
const AppError = require('../utils/appError');
const helper = require('../utils/helper');
const _ = require('lodash');
const path = require('path');
const util = require('util');
const fs = require('fs');
const fs_writeFile = util.promisify(fs.writeFile);
const fs_makeDir = util.promisify(fs.mkdir);
const mp3Duration = require('mp3-duration');
const { notify } = require('../startup/notification');

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

/* istanbul ignore next */
exports.multiPart = catchAsync(async (req, res, next) => {
  let uploadBuilder = new UploadBuilder();
  uploadBuilder.addfileField('track');
  uploadBuilder.addTypeFilter('audio/mpeg');
  uploadBuilder.constructUploader(true)(req, res, next);
});

exports.renameTrack = catchAsync(async (req, res, next) => {
  const track = await Track.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  res.status(200).json(track);
});

exports.deleteTrack = catchAsync(async (req, res, next) => {
  await Track.remove({ _id: req.track._id });
  await Album.update(
    { _id: req.track.album },
    { $pull: { tracks: req.track._id } }
  );
  res.status(204).json();
});

exports.addTrack = catchAsync(async (req, res, next) => {
  // check the existence of the track in the request
  const trackBuffer = req.body.track
    ? Buffer.from(req.body.track, 'base64')
    : req.files.track[0].buffer;
  if (!trackBuffer)
    return next(new AppError('please provide an mp3 track', 400));

  trackMeta = await exports.prepareTrack(trackBuffer, req.user);

  const album = await Album.findById(req.body.album);
  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }
  if (!album.artist.equals(req.user.id)) {
    return next(new AppError('Access denied', 400));
  }
  // add the track to the tracks collection
  const track = await Track.create({
    ..._.pick(req.body, ['name', 'album', 'explicit', 'premium', 'category']),
    ...trackMeta,
    artist: req.user._id
  });
  // add reference to the track in the album
  await Album.updateOne(
    { _id: req.body.album },
    { $push: { tracks: track._id } }
  );

  // add reference to the track in the Artist object
  const artist = await User.findByIdAndUpdate(req.user._id, {
    $push: { tracks: track._id }
  });

  const followers = await User.find({
    followedUsers: { $elemMatch: { $eq: artist._id } }
  }).distinct('_id');
  await notify(
    followers,
    req.body.album,
    'Tracks Updated',
    `${artist.name} has uploded a new track called ${track.name}`,
    `${album.image}`
  );
  res.status(200).json(track);
});

/* istanbul ignore next */
/**
 * function to prepare the buffer tracks get its duration and then save it
 * @param {Buffer} bufferTrack - Buffer contains track data
 * @param {Object} user - user object that contains artist's name and id
 * @returns {Object} The name of the stored track and duration of the track in milliseconds
 */
exports.prepareTrack = async function prepareTrack (bufferTrack, user) {
  // A) get the track duration in milliseconds
  const durationMs = (await mp3Duration(bufferTrack)) * 1000;

  // B1) generate a unique name for the track
  const trackName = `${helper.randomStr(20)}-${Date.now()}.mp3`;
  // B2) get the path where the track will be saved
  const rltvPath = `assets/tracks/${user._id}`;
  const absolutePath = path.resolve(`${__dirname}/../${rltvPath}`);

  // C1) make the directory for the artist tracks if doesn't exist
  await fs_makeDir(absolutePath, { recursive: true });
  // C2) add the track file to the artist track's folder
  await fs_writeFile(`${absolutePath}/${trackName}`, bufferTrack);

  const trackPath = `${rltvPath}/${trackName}`;
  return { trackPath, durationMs };
};

exports.checkCurrentArtist = catchAsync(async (req, res, next) => {
  const track = await Track.findById(req.params.id);
  if (!track) {
    return next(new AppError('No track found with that ID', 404));
  }
  if (!track.artist.equals(req.user.id)) {
    return next(new AppError('Access denied', 400));
  } else {
    req.track = track;
    next();
  }
});
