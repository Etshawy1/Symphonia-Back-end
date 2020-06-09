const controller = require('../../../controllers/artistController');
const { User } = require('../../../models/userModel');
const Track = require('../../../models/trackModel');
const Album = require('../../../models/albumModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse, mockPageRequest } = require('../../utils/Requests');
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
    const artistId = mongoose.Types.ObjectId();
    req = mockPageRequest(`/api/v1/artists/${artistId}/top-tracks`);
    req.params.id = artistId;
    Track.find = jest.fn().mockReturnValue(query);
  });
  it('should return top tracks for the artist', async () => {
    await controller.artistTopTracks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      tracks: expect.objectContaining({ items: toptracks })
    });
  });
});

describe('getArtistAlbums', () => {
  let req, res, next, albums, query;
  beforeAll(() => {
    query = mockQuery();
    res = mockResponse();
    next = jest.fn();
    albums = [{ albums: [{}] }];
    query.populate = jest.fn().mockReturnValue(albums);
    req = mockPageRequest();
    req.params.id = mongoose.Types.ObjectId();
    Album.find = jest.fn().mockReturnValue(query);
  });
  it('should return artist albums', async () => {
    await controller.getArtistAlbums(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      albums: expect.objectContaining({ items: albums })
    });
  });
});

describe('get artist', () => {
  let req, res, next, artist, followers;
  const followersCount = 5;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    artist = { _doc: { _id: mongoose.Types.ObjectId() } };
    followers = {
      user1: mongoose.Types.ObjectId(),
      user2: mongoose.Types.ObjectId(),
      user3: mongoose.Types.ObjectId(),
      count: jest.fn().mockReturnValue(followersCount)
    };
    req = { params: { id: artist._doc._id } };
    User.findById = jest.fn().mockReturnValue(artist);
    User.find = jest.fn().mockReturnValue(followers);
  });
  it('should return artist with number of followers if the id provided exists in the database', async () => {
    await controller.getArtist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(artist._doc, followersCount)
    );
  });

  it('should return error if the id provided is not in the database', async () => {
    User.findById = jest.fn().mockReturnValue(undefined);
    await controller.getArtist(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('that document does not exist', 404)
    );
  });
});
