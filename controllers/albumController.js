const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync').threeArg;
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Responser = require('../utils/responser');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const UploadBuilder = require('../utils/uploader').UploadBuilder;
const helper = require('../utils/helper');
const util = require('util');
const sizeOf = require('image-size');
const fs_writeFile = util.promisify(fs.writeFile);
const fs_makeDir = util.promisify(fs.mkdir);
const sharp = require('sharp');

/**
 * @module albumController
 */
exports.checkCurrentArtist = catchAsync(async (req, res, next) => {
  const album = await Album.findById(req.params.id);
  if (!album) {
    return next(new AppError('No album found with that ID', 404));
  }
  if (!album.artist.equals(req.user.id)) {
    return next(new AppError('Access denied', 400));
  } else {
    req.album = album;
    next();
  }
});

exports.deleteAlbum = catchAsync(async (req, res, next) => {
  await Track.remove({ _id: { $in: req.album.tracks } });
  await Album.findByIdAndDelete(req.params.id);
  res.status(204).json();
});

exports.renameAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).json(album);
});

exports.getManyAlbums = factory.getMany(Album, [
  { path: 'tracks', select: 'name' },
  { path: 'artist', select: 'name' }
]);
exports.getAlbum = factory.getOne(Album, [
  { path: 'tracks', select: 'name' },
  { path: 'artist', select: 'name' }
]);
exports.getAlbumTracks = catchAsync(async (req, res, next) => {
  const albumTracks = await Album.findById(req.params.id, 'tracks');
  if (!albumTracks) {
    return next(new AppError('that document does not exist', 404));
  }
  const features = new APIFeatures(
    Track.find({ _id: { $in: albumTracks.tracks } }).populate([
      { path: 'artist', select: 'name' },
      { path: 'album', select: 'name image' }
    ]),
    req.query
  ).offset();
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;
  const tracks = await features.query;

  res
    .status(200)
    .json(Responser.getPaging(tracks, 'tracks', req, limit, offset));
});

exports.createAlbum = catchAsync(async (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  let imageName;

  if (req.body.image) {
    const image = req.body.image.replace(/^data:image\/[a-z]+;base64,/, '');
    imageName = await exports.prepareAndSaveImage(
      Buffer.from(image, 'base64'),
      req.user
    );
  } else {
    imageName = req.files.image[0].filename;
  }
  const album = await Album.create({
    ..._.pick(req.body, ['name', 'albumType', 'releaseDate']),
    copyrights: {
      text: req.body.copyrightsText,
      type: req.body.copyrightsType
    },
    image: `${url}/api/v1/images/albums/${req.user._id}/${imageName}`,
    artist: req.user._id
  });
  res.status(200).json(album);
});

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.files.image[0].filename = await exports.prepareAndSaveImage(
    req.files.image[0].buffer,
    req.user
  );
  next();
});

exports.multiPart = catchAsync(async (req, res, next) => {
  let uploadBuilder = new UploadBuilder();
  uploadBuilder.addfileField('image');
  uploadBuilder.addTypeFilter('image/jpeg');
  uploadBuilder.addTypeFilter('image/png');
  uploadBuilder.setPath(
    path.resolve(__dirname, '..') + '/assets/images/albums'
  );
  uploadBuilder.constructUploader(true)(req, res, next);
});

/* istanbul ignore next */
/**
 * function to prepare the buffer image and manipulate it be resizing to be a sqaure jpeg image and save it
 * @param {Buffer} bufferImage - Buffer contains image data
 * @param {Object} user - user object that contains artist's name and id
 * @returns {String} The name of the stored image
 */
exports.prepareAndSaveImage = async function prepareAndSaveImage (
  bufferImage,
  user
) {
  // A1) get image data like the width and height and extension
  const imageData = sizeOf(bufferImage);
  const imageSize = Math.min(imageData.width, imageData.height, 300);
  // A2) manipulate the image to be square
  const decodedData = await sharp(bufferImage)
    .resize(imageSize, imageSize, { kernel: 'cubic' })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();
  const imageType = sizeOf(decodedData).type;

  // B) save the image with unique name to the following path
  const imageName = `${helper.randomStr(20)}-${Date.now()}.${imageType}`;
  const imagePath = path.resolve(
    `${__dirname}/../assets/images/albums/${user._id}`
  );
  await fs_makeDir(imagePath, { recursive: true });
  await fs_writeFile(`${imagePath}/${imageName}`, decodedData);

  return imageName;
};
