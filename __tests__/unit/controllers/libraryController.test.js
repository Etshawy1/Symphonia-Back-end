const controller = require('../../../controllers/libraryController');
const Track = require('../../../models/trackModel');
const Responser = require('../../../utils/responser');
const Helper = require('../../../utils/helper');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const {
  mockResponse,
  mockQuery,
  mockPageRequest
} = require('../../utils/Requests');
const Album = require('../../../models/albumModel');

describe("Check User's Saved Albums", () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.followedAlbums = ['1', '2', '3'];
    isIn = [true, true, false];
  });
  it('should return the playlists in a certain category', async () => {
    await controller.checkUserSavedAlbums(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(isIn);
  });
  it('should return ids parameter isnot found', async () => {
    req.query = {};
    await controller.checkUserSavedAlbums(req, res, next);
    expect(next).toHaveBeenCalledWith(new AppError('please provide the ids parameter', 400));
  });
});

describe("Check User's Saved Tracks", () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.followedTracks = ['1', '2', '3'];
    isIn = [true, true, false];
  });
  it('should return the playlists in a certain category', async () => {
    await controller.checkUserSavedTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(isIn);
  });

  it('should return AppError that ids parameter doesnot exist', async () => {
    req.query.ids = null;
    await controller.checkUserSavedTracks(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('please provide the ids parameter', 400)
    );
  });
});

describe("Get Current User's Saved Albums", () => {
  let req, res, next, albums, pageMeta;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.followedAlbums = ['1', '2', '3'];
    albums = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    Album.find = mockQuery(albums);
    pageMeta = Helper.getPageMeta(req);
  });
  it('should return Current User Saved Albums', async () => {
    await controller.getCurrentUserSavedAlbums(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      Responser.getPaging(
        albums,
        'Albums',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
  });
});

describe("Get Current User's Saved Tracks", () => {
  let req, res, next, albums, pageMeta;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.followedTracks = ['1', '2', '3'];
    tracks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    Track.find = mockQuery(tracks);
    pageMeta = Helper.getPageMeta(req);
  });
  it('should return Current User Saved Tracks', async () => {
    await controller.getCurrentUserSavedTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      Responser.getPaging(
        tracks,
        'tracks',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
  });
});

describe('remove albums for current user', () => {
  let req, res, next, albums, pageMeta;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.followedAlbums = ['1', '2', '3'];
    req.user.save = jest.fn();
  });
  it('should remove current user saved albums', async () => {
    await controller.removeCurrentUserAlbums(req, res, next);
    expect(req.user.followedAlbums).toEqual(expect.arrayContaining(['3']));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('should return an error indicating the ids must be provided', async () => {
    req.query.ids = undefined;
    await controller.removeCurrentUserAlbums(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('please provide the ids parameter', 400)
    );
  });
});

describe('remove tracks for current user', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.followedTracks = ['1', '2', '3'];
    req.user.save = jest.fn();
  });
  it('should remove current user saved tracks', async () => {
    await controller.removeCurrentUserSavedTracks(req, res, next);
    expect(req.user.followedTracks).toEqual(expect.arrayContaining(['3']));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('should return an error indicating the ids must be provided', async () => {
    req.query.ids = undefined;
    await controller.removeCurrentUserSavedTracks(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('please provide the ids parameter', 400)
    );
  });
});

describe('save albums for current user', () => {
  let req, res, next, albums;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '4,5' };
    req.user.followedAlbums = ['1', '2', '3'];
    req.user.save = jest.fn();
    Helper.checkIDS = jest.fn().mockReturnValue(true);
  });
  beforeEach(() => {
    req.query = { ids: '4,5' };
  });
  it('should save albums in  current user saved albums', async () => {
    await controller.saveCurrentUserAlbums(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
  it('should return an error indicating the ids must be provided', async () => {
    req.query.ids = undefined;
    await controller.saveCurrentUserAlbums(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('please provide the ids parameter', 400)
    );
  });

  it('should return an error indicating the ids must be provided', async () => {
    Helper.checkIDS = jest.fn().mockReturnValue(false);
    await controller.saveCurrentUserAlbums(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError(
        'one of the ids doesnot correspond to an object or repeated ids',
        400
      )
    );
  });
});

describe('save tracks for current user', () => {
  let req, res, next, tracks;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '4,5' };
    req.user.followedTracks = ['1', '2', '3'];
    req.user.save = jest.fn();
    Helper.checkIDS = jest.fn().mockReturnValue(true);
  });
  beforeEach(() => {
    req.query = { ids: '4,5' };
  });
  it('should save tracks in  current user saved tracks', async () => {
    req.user.followedTracks.includes = jest.fn().mockReturnValue(false);
    Track.findById = jest.fn().mockReturnValue(true);
    await controller.saveCurrentUserTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
  it('should return an error indicating the ids must be provided', async () => {
    req.query.ids = undefined;
    await controller.saveCurrentUserTracks(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('please provide the ids parameter', 400)
    );
  });

  it('should return an error indicating the ids must be provided', async () => {
    Helper.checkIDS = jest.fn().mockReturnValue(false);
    await controller.saveCurrentUserTracks(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError(
        'one of the ids doesnot correspond to an object or repeated ids',
        400
      )
    );
  });
});
