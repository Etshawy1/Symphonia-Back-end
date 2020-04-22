const catchAsync = require('./../utils/catchAsync').threeArg;
const SearchHistory = require('../models/searchHistoryModel');
const Category = require('../models/categoryModel');

exports.saveSearchHistory = catchAsync(async (req, res, next) => {
  if (!req.query.source || !req.user) {
    return next();
  }

  if (!getType[req.query.source]) {
    return next();
  }
  const history = {
    searchDate: Date.now(),
    userId: req.user._id,
    context: req.params.id,
    onModel: getType[req.query.source]
  };
  if (getType[req.query.source] === 'Category') {
    const category = await Category.findOne({ id: req.params.id });
    history.context = category._id;
  }
  await SearchHistory.create(history);
  return next();
});

const getType = {
  searchuser: 'User',
  searchtrack: 'Track',
  searchalbum: 'Album',
  searchcategory: 'Category',
  searchplaylist: 'Playlist'
};
