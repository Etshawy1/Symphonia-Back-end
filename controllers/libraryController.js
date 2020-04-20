const Category = require('./../models/categoryModel');
const { User } = require('../models/userModel');
const Album = require('../models/albumModel');
const Track = require('../models/trackModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const mongoose = require('mongoose');
const Responser = require('../utils/responser');
// TODO: finish the functions for the end points
exports.checkUserSavedAlbums = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('please provide the ids parameter', 400));
  }
  let ids = req.query.ids.split(',');
  let albums = req.user.followedAlbums;
  let isIn = [];
  ids.forEach(element => {
    if (albums.includes(element)) {
      isIn.push(true);
    } else {
      isIn.push(false);
    }
  });
  res.status(200).json(isIn);
});

exports.checkUserSavedTracks = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('please provide the ids parameter', 400));
  }
  let ids = req.query.ids.split(',');
  let tracks = req.user.followedTracks;
  let isIn = [];
  ids.forEach(element => {
    if (tracks.includes(element)) {
      isIn.push(true);
    } else {
      isIn.push(false);
    }
  });
  res.status(200).json(isIn);
});

exports.getCurrentUserSavedAlbums = catchAsync(async (req, res, next) => {
  // first get the ids of the saved Albums
  ids = req.user.followedAlbums;
  let limit = req.query.limit * 1 || 20; // the default
  let offset = req.query.offset * 1 || 0;

  const features = new APIFeatures(Album.find({ _id: { $in: ids } }), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();
  let albums = await features.query.populate('artist', 'name');
  res
    .status(200)
    .json(Responser.getPaging(albums, 'Albums', req, limit, offset));
});

exports.getCurrentUserSavedTracks = catchAsync(async (req, res, next) => {
  // first get the ids of the saved Albums
  ids = req.user.followedTracks;
  const limit = req.query.limit * 1 || 20;
  const offset = req.query.offset * 1 || 0;

  const features = new APIFeatures(Track.find({ _id: { $in: ids } }), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();

  let tracks = await features.query.populate([
    { path: 'artist', select: 'name' },
    { path: 'album', select: 'name image' }
  ]);
  res
    .status(200)
    .json(Responser.getPaging(tracks, 'tracks', req, limit, offset));
});

exports.removeCurrentUserAlbums = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('please provide the ids parameter', 400));
  }
  let ids = req.query.ids.split(',');
  isInvalid = false;

  try {
    ids.forEach(element => {
      if (!mongoose.Types.ObjectId.isValid(element)) {
        throw new AppError('invalid ids provided', 400);
      }
    });
  } catch (error) {
    return next(error);
  }

  // now i have to loop on the ids in the
  ids.forEach(element => {
    index = req.user.followedAlbums.indexOf(element);
    if (index != -1) {
      // remove it
      // swap the index with last then pop
      lastItem = req.user.followedAlbums[req.user.followedAlbums.length - 1];
      req.user.followedAlbums[index] = lastItem;
      req.user.followedAlbums.pop();
    }
  });
  await req.user.save({ validateBeforeSave: false });
  res.status(200).json();
});

exports.removeCurrentUserSavedTracks = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('please provide the ids parameter', 400));
  }
  let ids = req.query.ids.split(',');
  isInvalid = false;

  try {
    ids.forEach(element => {
      if (!mongoose.Types.ObjectId.isValid(element)) {
        throw new AppError('invalid ids provided', 400);
      }
    });
  } catch (error) {
    return next(error);
  }
  // now i have to loop on the ids in the
  ids.forEach(element => {
    index = req.user.followedTracks.indexOf(element);
    if (index != -1) {
      // remove it
      // swap the index with last then pop
      lastItem = req.user.followedTracks[req.user.followedTracks.length - 1];
      req.user.followedTracks[index] = lastItem;
      req.user.followedTracks.pop();
    }
  });
  await req.user.save({ validateBeforeSave: false });
  res.status(200).json();
});

// TODO: check that there are albums with these ids
exports.saveCurrentUserAlbums = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('please provide the ids parameter', 400));
  }
  let ids = req.query.ids.split(',');
  isInvalid = false;
  try {
    ids.forEach(element => {
      if (!mongoose.Types.ObjectId.isValid(element)) {
        throw new AppError('invalid id detected(sent)', 400);
      }
    });
  } catch (error) {
    return next(error);
  }
  let newUser = req.user;
  try {
    ids.forEach(element => {
      if (newUser.followedAlbums.includes(element)) {
        throw new AppError('Album already exists', 400);
      }
    });
  } catch (error) {
    return next(error);
  }
  newUser.followedAlbums.push(...ids);
  newUser = await newUser.save({ validateBeforeSave: false });
  res.status(201).json();
});

// TODO: check that there are Tracks with these ids
exports.saveCurrentUserTracks = catchAsync(async (req, res, next) => {
  if (!req.query.ids) {
    return next(new AppError('please provide the ids parameter', 400));
  }
  let ids = req.query.ids.split(',');
  isInvalid = false;
  try {
    ids.forEach(element => {
      if (!mongoose.Types.ObjectId.isValid(element)) {
        throw new AppError('invalid id detected(sent)', 400);
      }
    });
  } catch (error) {
    return next(error);
  }
  let newUser = req.user;
  try {
    ids.forEach(element => {
      if (newUser.followedTracks.includes(element)) {
        throw new AppError('Track already exists', 400);
      }
    });
  } catch (error) {
    return next(error);
  }
  newUser.followedTracks.push(...ids);
  newUser = await newUser.save({ validateBeforeSave: false });
  res.status(201).json();
});
