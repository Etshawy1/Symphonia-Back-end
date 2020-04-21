/* eslint-disable no-console */
const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync').threeArg;
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Responser = require('../utils/responser');
const fs = require('fs');
const path = require('path');
const UploadBuilder = require('../utils/uploader').UploadBuilder;
const helper = require('../utils/helper');
const util = require('util');
const sizeOf = require('image-size');
const fs_writeFile = util.promisify(fs.writeFile);
const sharp = require('sharp');

/**
 * @module albumController
 */

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
  )
    .filter()
    .sort()
    .offset();
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
    imageName = await prepareImage(Buffer.from(image, 'base64'));
  } else {
    imageName = req.files.image[0].filename;
  }
  const album = await Album.create({
    name: req.body.name,
    image: `${url}/api/v1/images/albums/${imageName}`,
    artist: req.user._id
  });
  res.status(200).json(album);
});

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.files.image[0].filename = await prepareImage(req.files.image[0].buffer);
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

/**
 *
 * @param {Buffer} imageBase64 - Base64 encoded image
 * @returns {String} The name of the stored image
 */
async function prepareImage (bufferImage) {
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
  imageName = `${helper.randomStr(20)}-${Date.now()}.${imageType}`;
  const imagePath = path.resolve(
    `${__dirname}\\..\\assets\\images\\albums\\${imageName}`
  );
  await fs_writeFile(imagePath, decodedData);

  return imageName;
}
