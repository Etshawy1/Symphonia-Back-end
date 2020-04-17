const controller = require('../../../controllers/browseController');
const { Track } = require('../../../models/trackModel');
const Category = require('../../../models/categoryModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse } = require('../../utils/Requests');

describe('getCategory', () => {
  let req, res, next, track;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const id = 'rocky_has_12';
    category = {};
    category.id = id;
    category.select = jest.fn().mockReturnValue(category);
    req = { params: { id: category.id } };
    Category.findOne = jest.fn().mockReturnValue(category);
  });
  it('should return a category if the id exists', async () => {
    let x = 'dumb';
    await controller.getCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(category);
  });
});

describe('get Paging object of categories playlists', () => {
  let req, res, next, track;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const id = 'rocky_has_12';
    category = {};
    category.id = id;
    category.select = jest.fn().mockReturnValue(category);
    req = { params: { id: category.id } };
    Category.findOne = jest.fn().mockReturnValue(category);
  });
  it('should return the categories playlists', async () => {
    await controller.getCategoriesPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.json).toHaveBeenCalledWith(category);
  });
});
