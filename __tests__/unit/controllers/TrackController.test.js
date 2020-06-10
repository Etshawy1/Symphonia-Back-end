const controller = require('../../../controllers/trackController');
const Track = require('../../../models/trackModel');
const Album = require('../../../models/albumModel');
const { User } = require('../../../models/userModel');
const { Notification } = require('../../../models/notificationsModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse } = require('../../utils/Requests');

describe('getTrack', () => {
  let req, res, next, track;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    track = {
      _id,
      populate: jest.fn().mockReturnValue({ _id })
    };
    req = { params: { id: track._id } };
    Track.findById = jest.fn().mockReturnValue(track);
  });
  it('should return a track if the id exists', async () => {
    await controller.getTrack(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(_.pick(track, '_id'));
  });

  it('should return response 404 if id not in the db', async () => {
    track.populate = jest.fn().mockReturnValue(null);

    await controller.getTrack(req, res, next);

    const error = new AppError('that document does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getSeveralTrack', () => {
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
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    track = { _id: mongoose.Types.ObjectId() };
    req = {
      body: { track: 'testBufferTrack', album: 'testAlbum' },
      user: { id: mongoose.Types.ObjectId() }
    };
    req.user._id = req.user.id;
    req.user.followedUsers = [];
    req.user.save = jest.fn();
    const album = { artist: req.user.id };
    Track.create = jest.fn().mockResolvedValue(track);
    Album.findById = jest.fn().mockResolvedValue(album);
    Album.updateOne = jest.fn();
    User.findByIdAndUpdate = jest.fn().mockReturnValue(req.user);
    const query = { distinct: jest.fn().mockReturnValue([]) };
    User.find = jest.fn().mockReturnValue(query);
    const notification = { _id: '', items: [], save: jest.fn() };
    Notification.create = jest.fn().mockReturnValue(notification);
    Notification.findById = jest.fn().mockReturnValue(notification);
    controller.prepareTrack = jest
      .fn()
      .mockReturnValue({ trackPath: 'testpath', durationMs: 300 });
  });
  it('should return status 200 if created successfully', async () => {
    await controller.addTrack(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(track);
  });
  it('should return status 400 if no track is provided', async () => {
    req.body.track = undefined;
    req.files = { track: [{}] };
    await controller.addTrack(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('please provide an mp3 track', 400)
    );
  });
  it('should return status 404 if album provided is not found', async () => {
    Album.findById = jest.fn().mockResolvedValue(undefined);
    await controller.addTrack(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('No album found with that ID', 400)
    );
  });

  it('should return status 400 if user is not the album owner', async () => {
    req.user.id = mongoose.Types.ObjectId();
    await controller.addTrack(req, res, next);
    expect(next).toHaveBeenCalledWith(new AppError('Access denied', 400));
  });
});

describe('rename Track', () => {
  let req, res, next, track;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    track = { _id: mongoose.Types.ObjectId() };
    req = {
      body: { name: 'trackNewName' },
      params: { id: mongoose.Types.ObjectId() }
    };
    Track.findByIdAndUpdate = jest.fn().mockResolvedValue(track);
  });
  it('should return status 200 if renamed track successfully', async () => {
    await controller.renameTrack(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(track);
  });
});

describe('delete Track', () => {
  let req, res, next, track;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    track = { _id: mongoose.Types.ObjectId(), album: 'trackAlbum' };
    req = {
      track,
      params: { id: mongoose.Types.ObjectId() }
    };
    Track.remove = jest.fn().mockResolvedValue();
    Album.update = jest.fn().mockResolvedValue();
  });
  it('should return status 204 if deleted successfully', async () => {
    await controller.deleteTrack(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
  });
});
