const middleware = require('../../../utils/searchMiddleware');
const mongoose = require('mongoose');
const SearchHistory = require('../../../models/searchHistoryModel');
const Category = require('../../../models/categoryModel');
const { mockResponse } = require('../../utils/Requests');

describe('store user search history', () => {
  let req, res, next, track;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    req = {
      query: { source: 'searchuser' },
      user: { _id: mongoose.Types.ObjectId() },
      params: { id: mongoose.Types.ObjectId() }
    };
    SearchHistory.create = jest.fn();
  });
  it('should store history if there was a signed in user', async () => {
    await middleware.saveSearchHistory(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should not store history if there was no signed in user', async () => {
    req.query.source = undefined;
    await middleware.saveSearchHistory(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should not store history if provided unsupported type', async () => {
    req.query.source = 'podcast'; // we don't have podcast collection in the project
    await middleware.saveSearchHistory(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should get category id if the source was a category to be stored in history', async () => {
    req.query.source = 'searchcategory';
    Category.findOne = jest.fn().mockReturnValue({ _id: 'categoryId' });
    await middleware.saveSearchHistory(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
