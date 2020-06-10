const controller = require('../../../controllers/trackController');
const middleware = require('../../../controllers/albumController');
const Track = require('../../../models/trackModel');
const Album = require('../../../models/albumModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const { mockResponse } = require('../../utils/Requests');

describe('check current artist owns the provided track', () => {
  let req, res, next, track;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    track = {
      _id: mongoose.Types.ObjectId(),
      artist: mongoose.Types.ObjectId()
    };
    req = { params: { id: track._id }, user: { id: track.artist } };
    Track.findById = jest.fn().mockReturnValue(track);
  });
  it('should put the track object on the request if artist owns this track', async () => {
    await controller.checkCurrentArtist(req, res, next);
    expect(req.track).toEqual(track);
  });
  it('should return error 404 if provided track id is not found', async () => {
    Track.findById = jest.fn().mockReturnValue(undefined);
    await controller.checkCurrentArtist(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('No track found with that ID', 404)
    );
  });
  it('should return access denied if artist does not own the track', async () => {
    req.user.id = mongoose.Types.ObjectId();
    await controller.checkCurrentArtist(req, res, next);
    expect(next).toHaveBeenCalledWith(new AppError('Access denied', 400));
  });
});

describe('check current artist owns the provided album', () => {
  let req, res, next, track;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    album = {
      _id: mongoose.Types.ObjectId(),
      artist: mongoose.Types.ObjectId()
    };
    req = { params: { id: album._id }, user: { id: album.artist } };
    Album.findById = jest.fn().mockReturnValue(album);
  });
  it('should put the album object on the request if artist owns it', async () => {
    await middleware.checkCurrentArtist(req, res, next);
    expect(req.album).toEqual(album);
  });
  it('should return error 404 if provided album id is not found', async () => {
    Album.findById = jest.fn().mockReturnValue(undefined);
    await middleware.checkCurrentArtist(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('No album found with that ID', 404)
    );
  });
  it('should return access denied if artist does not own the album', async () => {
    req.user.id = mongoose.Types.ObjectId();
    await middleware.checkCurrentArtist(req, res, next);
    expect(next).toHaveBeenCalledWith(new AppError('Access denied', 400));
  });
});
