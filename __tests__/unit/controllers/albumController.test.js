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
    query.query = albums;
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
      params: { id: mongoose.Types.ObjectId },
      query: { gte: '1' }
    };

    tracks = [{ id1: mongoose.Types.ObjectId }];
    query.populate = jest.fn().mockReturnValue(tracks);
    Album.findById = jest.fn().mockReturnValue(query);
  });
  it('Should return album tracks', async function() {
    await controller.getAlbumTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(tracks);
  });
});
describe('getAlbum', () => {
  let req, res, next, album, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId },
      query: { gte: '1' }
    };
    album = { id1: mongoose.Types.ObjectId };
    query.populate = jest.fn().mockReturnValue(album);
    Album.findById = jest.fn().mockReturnValue(query);
  });
  it('Should return an album ', async function() {
    await controller.getAlbum(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(album);
  });
});
