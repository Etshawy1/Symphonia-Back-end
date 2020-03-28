const Category = require('./../models/categoryModel');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync').threeArg;

exports.getCategory = catchAsync(async (req, res, next) => {
  console.log(req.params);
  category = await Category.findOne({
    id: req.params.id
  }).select('-_id -__v');

  res.status(200).json({
    category
  });
});

exports.getCategoriesPlaylists = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'not implementedd yet getCategoriesPlaylists'
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
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
  console.log(req.body);
  const category = await Category.create({
    name: req.body.name,
    icons: req.body.icons
  });

  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});
