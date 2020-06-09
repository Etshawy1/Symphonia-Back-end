const controller = require('../../../controllers/trackController');
const Track = require('../../../models/trackModel');
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
