const Category = require('./../models/categoryModel');
const { User } = require('../models/userModel');
const Album = require('../models/albumModel');
const Playlist = require('../models/playlistModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
const AppError = require('../utils/appError');
exports.getCategory = catchAsync(async (req, res, next) => {
  console.log(req.params);
  category = await Category.findOne({
    id: req.params.id
  }).select('-_id -__v');

  res.status(200).json(category);
});

exports.getCategoriesPlaylists = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError('please provide an id for the category'), 400);
  }

  let limit = 20; // the default

  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  // firstly i need to get the category with the name provided
  let myCat = await Category.findOne({ id: req.params.id });

  if (!myCat) {
    return next(new AppError("category is n't found "), 404);
  }
  const features = new APIFeatures(
    Playlist.find({ category: myCat._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .offset();

  playlists = await features.query;
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;
  let href = LOCAL_HOST + `api/v1/browse/categories/${myCat.id}/playlists`;
  let nnext = `${href}?offset=${offset + limit}&limit=${limit}`;
  let preOffset = offset - limit;
  if (preOffset < 0) {
    preOffset = 0;
  }

  let previous = `${href}?offset=${preOffset}&limit=${limit}`;
  if (preOffset == offset) {
    previous = null;
  }

  href = `${href}?offset=${offset}&limit=${limit}`;

  res.status(200).json({
    playlists: {
      total: playlists.length,
      next: nnext,
      previous: previous,
      href: href,
      items: playlists,
      limit,
      offset
    }
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
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

exports.getArtists = catchAsync(async (req, res, next) => {
  let limit = 20; // the default
  let offset = 0; // the default
  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  const features = new APIFeatures(User.find({ type: 'artist' }), req.query)
    .filter()
    .sort()
    .limitFields()
    .offset();

  artists = await features.query.select('-queue');

  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;
  let href = LOCAL_HOST + `api/v1/browse/artists`;
  let nnext = `${href}?offset=${offset + limit}&limit=${limit}`;
  let preOffset = offset - limit;
  if (preOffset < 0) {
    preOffset = 0;
  }

  let previous = `${href}?offset=${preOffset}&limit=${limit}`;
  if (preOffset == offset) {
    previous = null;
  }
  href = `${href}?offset=${offset}&limit=${limit}`;
  res.status(200).json({
    artists: {
      total: artists.length,
      next: nnext,
      previous: previous,
      href: href,
      items: artists,
      limit,
      offset
    }
  });
});

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
  console.log(albums);

  let LOCAL_HOST = `${req.protocol}://${req.get('host')}/`;
  let href = LOCAL_HOST + `api/v1/browse/new-releases`;
  let nnext = `${href}?offset=${offset + limit}&limit=${limit}`;
  let preOffset = offset - limit;
  if (preOffset < 0) {
    preOffset = 0;
  }

  let previous = `${href}?offset=${preOffset}&limit=${limit}`;
  if (preOffset == offset) {
    previous = null;
  }

  href = `${href}?offset=${offset}&limit=${limit}`;
  res.status(200).json({
    albums: {
      total: albums.length,
      next: nnext,
      previous: previous,
      href: href,
      items: albums,
      limit,
      offset
    }
  });
});

exports.getRecommendations = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getRecommendations'
  });
});
exports.createCategory = catchAsync(async (req, res, next) => {
  let category = await Category.create({
    name: req.body.name
    //  ,icons: req.files.icon[0].filename
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
