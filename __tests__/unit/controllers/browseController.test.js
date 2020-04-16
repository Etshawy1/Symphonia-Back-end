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
    //console.log(res.json);
    expect(res.json).toHaveBeenCalledWith(category);
  });

  /*it('should return response 404 if id not in the db', async () => {

    category.findById = jest.fn().mockReturnValue(category);

    await controller.getCategory(req, res, next);

    const error = new AppError('that document does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
  });*/
});
/*
describe('getListOfCategorys', () => {
  let req, res, next, tracks, query;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    tracks = [
      {
        _id: mongoose.Types.ObjectId()
      },
      {
        _id: mongoose.Types.ObjectId()
      }
    ];
    query = { populate: jest.fn().mockReturnValue(tracks) };
    req = { query: { ids: '1,2' } };
    Track.find = jest.fn().mockReturnValue(query);
  });
  it('should return tracks if the id exists in the database', async () => {
    await controller.getSeveralTacks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tracks);
  });

  it('should return response 404 if all ids not in the db', async () => {
    query.populate = jest.fn().mockReturnValue([]);

    await controller.getSeveralTacks(req, res, next);

    const error = new AppError('No documents found with provided IDs', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('addTrack', () => {
  let req, res, next, track;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    track = { _id: mongoose.Types.ObjectId() };
    req = { body: {} };
    Track.create = jest.fn().mockResolvedValue(track);
  });
  it('should return status 201 if created successfully', async () => {
    await controller.addTrack(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
*/
