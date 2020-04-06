const Category = require('./../models/categoryModel');
const { User } = require('../models/userModel');
const Album = require('../models/albumModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

// TODO: finish the functions for the end points
exports.checkUserSavedAlbums = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet checkUserSavedAlbums'
  });
});

exports.checkUserSavedTracks = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet checkUserSavedTracks'
  });
});

exports.getCurrentUserSavedAlbums = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet GetCurrentUserSavedAlbums'
  });
});

exports.getCurrentUserSavedTracks = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet GetCurrentUserSavedTracks'
  });
});

exports.removeCurrentUserAlbums = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet removeCurrentUserAlbums'
  });
});

exports.removeCurrentUserSavedTracks = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet removeUserSavedTracks'
  });
});

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
      if (newUser.followedAlbums.includes(element)) {
        throw new AppError('Album already exists', 400);
      }
    });
  } catch (error) {
    return next(error);
  }
  newUser.followedAlbums.push(...ids);
  newUser = await newUser.save({ validateBeforeSave: false });
  res.status(200).json({
    newUser
  });
});
