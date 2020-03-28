/* eslint-disable no-console */
// const {Album,validateAlbum} = require('./../models/albumModel');
const Album = require('./../models/albumModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;

exports.getAllAlbums = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Album.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const albums = await features.query;

  res.status(200).json({
    status: 'success',
    results: albums.length,
    data: {
      albums
    }
  });
});

exports.getAlbum = catchAsync(async (req, res, next) => {
  const check = await Album.findById(req.params.id);
  if (!check) return res.status(404).send('This Album is not found!');
  const features = new APIFeatures(Album.findById(req.params.id), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const album = await features.query;
  res.status(200).json({
    status: 'success',
    results: album.length,
    data: {
      album
    }
  });
});

exports.getAlbumTracks = catchAsync(async (req, res, next) => {
  const check = await Album.findById(req.params.id);
  if (!check) return res.status(404).send('This Album is not found!');
  const features = new APIFeatures(
    Album.findById(req.params.id).select('tracks'),
    req.query
  );
  const tracks = await features.query;
  res.status(200).json({
    status: 'success',
    results: tracks.length,
    data: {
      tracks
    }
  });
});

exports.createAlbum = catchAsync(async (req, res, next) => {
  const album = await Album.create({
    name: req.body.name,
    year: req.body.year,
    image: req.body.image,
    artist: req.body.artist,
    tracks: req.body.tracks
  });

  console.log(album);
  res.status(200).json({
    status: 'success',
    results: album.length,
    data: {
      album
    }
  });
});
