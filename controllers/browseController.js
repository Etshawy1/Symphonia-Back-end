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
  console.log(req.params);
  category = await Category.findOne({
    id: req.params.id
  }).select('-_id -__v');

  res.status(200).json(category);
});

exports.getCategoriesPlaylists = catchAsync(async (req, res, next) => {
  // if (!req.params.id) {
  //   return next(new AppError('please provide an id for the category'), 400);
  // }

  let limit = req.query.limit ? req.query.limit * 1 : 20; // the default
  let offset = req.query.offset ? req.query.offset * 1 : 0;
  // firstly i need to get the category with the name provided
  let myCat = await Category.findOne({ id: req.params.id });

  if (!myCat) {
    return next(new AppError("category is n't found "), 404);
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
    .sort()
    .limitFields()
    .offset();

  playlists = await features.query;
  res
    .status(200)
    .json(Responser.getPaging(playlists, 'playlists', req, limit, offset));
});

exports.getCategoriesTemp = catchAsync(async (req, res, next) => {
  pageMeta = Helper.getPageMeta(req);
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let categorys = await features.query;
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;

  // TODO: adding .href to  the objects doesn't work
  /*
  categorys = categorys.forEach(element => {
    element.href = 'toto';
  });
*/
  res.status(200).json({
    status: 'success',
    results: categorys.length,
    data: {
      categorys
    }
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  pageMeta = Helper.getPageMeta(req);
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();
  //console.log(typeof features.query)
  let categorys = await features.query;
  // TODO: adding .href to  the objects doesn't work
  /*
  categorys = categorys.forEach(element => {
    element.href = 'toto';
  });
*/
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
    .sort()
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

//TODO: remove this if not needed
exports.getFeaturedPlaylists = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getFeaturedPlaylists'
  });
});

exports.getNewRelease = catchAsync(async (req, res, next) => {
  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const features = new APIFeatures(
    Album.find({ releaseDate: { $exists: true } }),
    req.query
  )
    .filter()
    .limitFields()
    .offset();
  features.query = features.query.sort('-releaseDate');
  let albums = await features.query;
  res
    .status(200)
    .json(Responser.getPaging(albums, 'albums', req, limit, offset));
});

//TODO: remove this if not needed
exports.getRecommendations = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getRecommendations'
  });
});
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
