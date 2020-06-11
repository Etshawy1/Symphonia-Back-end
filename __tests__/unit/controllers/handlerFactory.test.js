const controller = require('../../../controllers/handlerFactory');
const Album = require('../../../models/albumModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const { mockResponse, mockQuery } = require('../../utils/Requests');

describe('deleteOneDocuemnt', () => {
  let req, res, next, album;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    album = { _id: mongoose.Types.ObjectId() };
    req = { params: { id: album._id } };
    Album.findByIdAndDelete = jest.fn().mockResolvedValue(album);
  });
  it('should return status 204 if deleted successfully', async () => {
    await controller.deleteOne(Album)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(null);
  });
  it('should return status 404 if document was not found', async () => {
    Album.findByIdAndDelete = jest.fn().mockResolvedValue(undefined);
    await controller.deleteOne(Album)(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('No document found with that ID', 404)
    );
  });
});

describe('updateOneDocuemnt', () => {
  let req, res, next, album;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    album = { _id: mongoose.Types.ObjectId() };
    req = { params: { id: album._id } };
    Album.findByIdAndUpdate = jest.fn().mockResolvedValue(album);
  });
  it('should return 200 and the new document if successful', async () => {
    await controller.updateOne(Album)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(album);
  });
  it('should return status 404 if document was not found', async () => {
    Album.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
    await controller.updateOne(Album)(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('No document found with that ID', 404)
    );
  });
});

describe('createOneDocuemnt', () => {
  let req, res, next, album;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    album = { _id: mongoose.Types.ObjectId() };
    req = {};
    Album.create = jest.fn().mockResolvedValue(album);
  });
  it('should return 200 and the new document if successful', async () => {
    await controller.createOne(Album)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(album);
  });
});

describe('getAllDocuemnt', () => {
  let req, res, next, albums;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const album = { _id: mongoose.Types.ObjectId() };
    albums = [album, album, album];
    req = {};
    Album.find = jest.fn().mockReturnValue(albums);
  });
  it('should return 200 and the new document if successful', async () => {
    await controller.getAll(Album)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(albums);
  });
});
