const controller = require('../../../controllers/albumController');
const Album = require('../../../models/albumModel');
const Track = require('../../../models/trackModel');
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
    req = { query: { ids: '' } };
    albums = [
      {
        id: mongoose.Types.ObjectId()
      },
      {
        id: mongoose.Types.ObjectId()
      }
    ];
    Album.find = jest.fn().mockReturnValue(query);
    query.populate = jest.fn().mockReturnValue(albums);
  });

  it('Should return all the Albums', async () => {
    await controller.getManyAlbums(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(albums);
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
    query.populate = jest.fn().mockReturnValue(query);
    Album.findById = jest.fn().mockReturnValue(tracks);
    Track.find = jest.fn().mockReturnValue(query);
  });

  it('Should return album tracks', async () => {
    await controller.getAlbumTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(query);
  });
  it('Should return error if album id not found', async () => {
    Album.findById = jest.fn().mockReturnValue(null);
    await controller.getAlbumTracks(req, res, next);
    const error = new AppError('that document does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
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
    expect(res.json).toHaveBeenCalledWith(album);
  });

  it('Should return error if album id not found', async () => {
    Album.findById = jest.fn().mockReturnValue(null);
    await controller.getAlbumTracks(req, res, next);
    const error = new AppError('that document does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});
