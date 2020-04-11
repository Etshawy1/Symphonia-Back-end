const controller = require('../../../controllers/albumController');
const Album = require('../../../models/albumModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse } = require('../../utils/Requests');
const { mockQuery } = require('../../utils/apiFeatures');

describe('getAllAlbums', () => {
  let req, res, next, albums, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();

    next = jest.fn();
    req = { query: {} };
    albums = {
      id1: mongoose.Types.ObjectId()
    };
    Album.find = jest.fn().mockReturnValue(query);
  });

  it('Should return all the Albums', async () => {
    await controller.getAllAlbums(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(query);
  });
});

describe('getAlbumTracks', () => {
  let req, res, next, tracks, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      query: {}
    };
    tracks = [
      { _id: mongoose.Types.ObjectId() },
      { _id: mongoose.Types.ObjectId() }
    ];
    query.populate = jest.fn().mockResolvedValue(tracks);
    Album.findById = jest.fn().mockReturnValue(query);
  });

  it('Should return album tracks', async () => {
    await controller.getAlbumTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(tracks);
  });
  it('Should return error if album id not found', async () => {
    Album.findById = jest.fn().mockReturnValue(null);
    await controller.getAlbumTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('This Album is not found!');
  });
});
describe('getAlbum', () => {
  let req, res, next, album, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      query: {}
    };
    album = { _id: mongoose.Types.ObjectId() };
    query.populate = jest.fn().mockReturnValue(album);
    Album.findById = jest.fn().mockReturnValue(query);
  });

  it('Should return an album ', async () => {
    await controller.getAlbum(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(album);
  });

  it('Should return error if album id not found', async () => {
    Album.findById = jest.fn().mockReturnValue(null);
    await controller.getAlbumTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('This Album is not found!');
  });
});
