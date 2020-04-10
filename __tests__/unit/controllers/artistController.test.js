const controller = require('../../../controllers/artistController');
const { User } = require('../../../models/userModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse } = require('../../utils/Requests');
const { mockQuery } = require('../../utils/apiFeatures');

describe('relatedArtists', () => {
  let req, res, next, artist, artists;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    artist = { _id, type: 'artist' };
    artists = {
      artist1: mongoose.Types.ObjectId(),
      artist2: mongoose.Types.ObjectId(),
      artist3: mongoose.Types.ObjectId()
    };
    req = { params: { id: artist._id } };
    User.findById = jest.fn().mockReturnValue(artist);
    User.aggregate = jest.fn().mockReturnValue(artists);
  });
  it('should return three related artists to a specific artist if id is provided', async () => {
    await controller.relatedArtists(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ artists });
  });

  it('should return response 404 if id not in the db', async () => {
    User.findById = jest.fn().mockReturnValue(null);

    await controller.relatedArtists(req, res, next);

    const error = new AppError('that artist does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return response 404 if id belogns to normal user', async () => {
    artist.type = 'user';
    await controller.relatedArtists(req, res, next);
    const error = new AppError('that artist does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('artistFollowers', () => {
  let req, res, next, followers, query;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    followers = {
      follower1: mongoose.Types.ObjectId(),
      follower2: mongoose.Types.ObjectId(),
      follower3: mongoose.Types.ObjectId()
    };
    query = { select: jest.fn().mockReturnValue(followers) };
    req = { params: { id: mongoose.Types.ObjectId() } };
    User.find = jest.fn().mockReturnValue(query);
  });
  it('should return followers and their count', async () => {
    await controller.artistFollowers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      followers,
      count: followers.length
    });
  });
});

describe('artistTopTracks', () => {
  let req, res, next, tracks, toptracks, query;
  beforeAll(() => {
    query = mockQuery();
    res = mockResponse();
    next = jest.fn();
    toptracks = [
      { tracks: [{ getPreviewUrl: jest.fn().mockReturnValue('') }] }
    ];
    query.populate = jest.fn().mockReturnValue(toptracks);
    req = {
      params: { id: mongoose.Types.ObjectId() },
      query: { gte: '1' },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost')
    };
    User.findById = jest.fn().mockReturnValue(query);
  });
  it('should return followers and their count', async () => {
    await controller.artistTopTracks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(toptracks);
  });
});
