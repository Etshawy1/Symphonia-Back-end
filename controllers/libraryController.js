const Category = require('./../models/categoryModel');
const { User } = require('../models/userModel');
const Album = require('../models/albumModel');
const { Track } = require('../models/trackModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

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

// TODO: 1. modify teh get Paging to cancell the linkSpec function
// TODO: 1. modify the getPaging and handle next = null in case there is nothing left to explore
const getPaging = (
  items,
  modelName,
  limit = null,
  offset = null,
  next = null,
  previous = null,
  href = null
) => {
  if (items.length < limit) {
    next = null;
  }
  let page = {};
  page[modelName] = {
    total: items.length,
    items,
    limit,
    offset,
    next,
    previous,
    href
  };
  return page;
};
const getLinkSPec = (req, limit, offset) => {
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;
  let href = LOCAL_HOST + `api/v1/me/albums`;
  let nnext = `${href}?offset=${offset + limit}&limit=${limit}`;
  let preOffset = offset - limit;
  if (preOffset < 0) {
    preOffset = 0;
  }
  let previous = `${href}?offset=${preOffset}&limit=${limit}`;
  if (preOffset == offset) {
    previous = null;
  }

  return {
    href,
    next: nnext,
    previous,
    limit,
    offset
  };
};
exports.getCurrentUserSavedAlbums = catchAsync(async (req, res, next) => {
  // first get the ids of the saved Albums
  ids = req.user.followedAlbums;

  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  const features = new APIFeatures(Album.find({ _id: { $in: ids } }), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();
  let albums = await features.query;
  let linkSpec = getLinkSPec(req, limit, offset);
  res.status(200).json(
    getPaging(
      albums,
      'Albums',

      linkSpec.limit,
      linkSpec.offset,
      linkSpec.next,
      linkSpec.previous,
      linkSpec.href
    )
  );
});

exports.getCurrentUserSavedTracks = catchAsync(async (req, res, next) => {
  // first get the ids of the saved Albums
  ids = req.user.followedTracks;
  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  const features = new APIFeatures(Track.find({ _id: { $in: ids } }), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();

  let tracks = await features.query;
  let linkSpec = getLinkSPec(req, limit, offset);

  res
    .status(200)
    .json(
      getPaging(
        tracks,
        'tracks',
        linkSpec.limit,
        linkSpec.offset,
        linkSpec.next,
        linkSpec.previous,
        linkSpec.href
      )
    );
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
