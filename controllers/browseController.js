const Category = require('./../models/categoryModel');
const sharp = require('sharp');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;
exports.getCategory = catchAsync(async (req, res, next) => {
  console.log(req.params);
  category = await Category.findOne({
    id: req.params.id
  }).select('-_id -__v');

  res.status(200).json(category);
});

exports.getCategoriesPlaylists = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getCategoriesPlaylists'
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  console.log('query is ');
  console.log(req.query);

  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const categorys = await features.query;

  res.status(200).json({
    status: 'success',
    results: categorys.length,
    data: {
      categorys
    }
  });
});

exports.getFeaturedPlaylists = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getFeaturedPlaylists'
  });
});

exports.getNewRelease = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getNewRelease'
  });
});

exports.getRecommendations = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getRecommendations'
  });
});
exports.createCategory = catchAsync(async (req, res, next) => {
  /* for testing purposes */
  console.log('request query');
  console.log(req.query);
  console.log('request body');
  console.log(req.body);
  console.log(req.files);
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
  console.log(imageUrl);
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
