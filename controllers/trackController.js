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
  // check the existence of the track in the request
  const trackBuffer = req.body.track
    ? Buffer.from(req.body.track, 'base64')
    : req.files.track[0].buffer;
  if (!trackBuffer)
    return next(new AppError('please provide an mp3 track', 400));

  trackMeta = await prepareTrack(trackBuffer, req.user);

  // add the track to the tracks collection
  const track = await Track.create({
    ..._.pick(req.body, ['name', 'album', 'explicit', 'premium', 'category']),
    ...trackMeta,
    artist: req.user._id
  });

  // add reference to the track in the Artist object
  await User.findByIdAndUpdate(req.user._id, {
    $push: { tracks: track._id }
  });

  res.status(200).json(track);
});

/**
 * function to prepare the buffer tracks get its duration and then save it
 * @param {Buffer} bufferTrack - Buffer contains track data
 * @param {Object} user - user object that contains artist's name and id
 * @returns {Object} The name of the stored track and duration of the track in milliseconds
 */
async function prepareTrack(bufferTrack, user) {
  // A) get the track duration in milliseconds
  const durationMs = (await mp3Duration(bufferTrack)) * 1000;

  // B1) generate a unique name for the track
  const trackName = `${helper.randomStr(20)}-${Date.now()}.mp3`;
  // B2) get the path where the track will be saved
  const rltvPath = `assets/tracks/${user.name.replace(/ /g, '_')}-${user._id}`;
  const absolutePath = path.resolve(`${__dirname}/../${rltvPath}`);

  // C1) make the directory for the artist tracks if doesn't exist
  await fs_makeDir(absolutePath, { recursive: true });
  // C2) add the track file to the artist track's folder
  await fs_writeFile(`${absolutePath}/${trackName}`, bufferTrack);

  const trackPath = `${rltvPath}/${trackName}`;
  return { trackPath, durationMs };
}
// Relative to Album

exports.renameAlbumTrack = catchAsync(async (req, res, next) => {
  let tracks = Album.findById(req.params.id, 'tracks');
  if (!tracks) {
    return next(new AppError('that document does not exist', 404));
  }

  for (let index = 0; index < tracks.length; index++) {
    if (req.params.trackId != tracks[index] && index == tracks.length - 1)
      return next(new AppError('that document does not exist', 404));
  }
  let track = await Track.findByIdAndUpdate(
    { _id: req.params.trackId },
    { name: req.body.name },
    { new: true }
  );
  res.status(200).json(track);
});

exports.deleteAlbumTrack = catchAsync(async (req, res, next) => {
  let tracks = Album.findById(req.params.id, 'tracks');
  if (!tracks) {
    return next(new AppError('that document does not exist', 404));
  }

  for (let index = 0; index < tracks.length; index++) {
    if (req.params.trackId != tracks[index] && index == tracks.length - 1)
      return next(new AppError('that document does not exist', 404));
  }
  console.log(tracks);
  await Album.update(
    { _id: req.params.id },
    { $pull: { tracks: { _id: req.params.trackId } } }
  );
  // if I delete it from Track Like findByIdandRemove(req.params.trackId)
  // will it removed from the Album as I removed the reference ??
  res.status(200).json(null);
});
