const Category = require('./../models/categoryModel');
const { User } = require('../models/userModel');
const Album = require('../models/albumModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
const Responser = require('../utils/responser');
const Helper = require('../utils/helper');
const mongoose = require('mongoose');
/**
 * @module browseController
 */

exports.getCategory = catchAsync(async (req, res, next) => {
  category = await Category.findOne({
    id: req.params.id
  }).select('-_id -__v');

  res.status(200).json(category);
});

exports.getCategoriesPlaylists = catchAsync(async (req, res, next) => {
  let limit = req.query.limit * 1 || 20; // the default
  let offset = req.query.offset * 1 || 0;
  // firstly i need to get the category with the name provided
  let myCat = await Category.findOne({ id: req.params.id });

  if (!myCat) {
    return next(new AppError("category is n't found ", 404));
  }
  const features = new APIFeatures(
    Playlist.find({
      category: myCat._id,
      $or: [
        { public: true },
        { owner: req.user ? req.user.id : mongoose.Types.ObjectId() }
      ]
    }),
    req.query
  )
    .filter()
    .limitFields()
    .offset();

  playlists = await features.query;
  res
    .status(200)
    .json(Responser.getPaging(playlists, 'playlists', req, limit, offset));
});

exports.getCategories = catchAsync(async (req, res, next) => {
  pageMeta = Helper.getPageMeta(req);
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .limitFields()
    .offset();
  let categorys = await features.query;

  res
    .status(200)
    .json(
      Responser.getPaging(
        categorys,
        'categories',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
});

/**
 * @summary it returns the artists that the user isn't following
 */
exports.getRecommendedArtists = catchAsync(async (req, res, next) => {
  let pageMeta = Helper.getPageMeta(req);
  // push the user him self
  excUsers = req.user.followedUsers;
  excUsers.push(req.user._id);

  const features = new APIFeatures(
    User.find({ _id: { $nin: excUsers }, type: 'artist' }),
    req.query
  )
    .filter()
    .limitFields()
    .offset();

  // artists = [{ id: 1 }, { id: 2 }, { id: 3 }];
  artists = await features.query.select('-queue');
  res
    .status(200)
    .json(
      Responser.getPaging(
        artists,
        'artists',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
});

exports.getNewRelease = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 12;
  const offset = req.query.offset * 1 || 0;
  const features = new APIFeatures(
    Album.find({ tracks: { $not: { $size: 0 } } }).sort('-releaseDate'),
    req.query
  ).offset();
  const albums = await features.query;
  res
    .status(200)
    .json(Responser.getPaging(albums, 'albums', req, limit, offset));
});

/* istanbul ignore next */
// NOTE: it is better to do an itegeration testing for it
exports.createCategory = catchAsync(async (req, res, next) => {
  let category = await Category.create({
    name: req.body.name
  });

  if (!req.files) {
    // you have to provide a default icon
    let working = null;
  }
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;

  let fileMeta = req.files.icon[0];
  let imageMeta = await sharp(fileMeta.path).metadata();
  let imageUrl =
    `${LOCAL_HOST}api/v1/browse/categories/images/` +
    req.files.icon[0].filename;

  category = await Category.findByIdAndUpdate(
    category._id,
    {
      $push: {
        icons: {
          url: imageUrl,
          width: imageMeta.width,
          heght: imageMeta.height
        }
      }
    },
    {
      new: true,
      useFindAndModify: false
    }
  );

  res.status(200).json({
    category
  });
});
