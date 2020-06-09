const controller = require('../../../controllers/albumController');
const Album = require('../../../models/albumModel');
const Track = require('../../../models/trackModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse, mockPageRequest } = require('../../utils/Requests');
const { mockQuery } = require('../../utils/apiFeatures');

describe('delete Album', () => {
  let req, res, next, album;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    album = { _id: mongoose.Types.ObjectId(), tracks: ['track1, track2'] };
    req = {
      album,
      params: { id: mongoose.Types.ObjectId() }
    };
    Track.remove = jest.fn().mockResolvedValue();
    Album.findByIdAndDelete = jest.fn().mockResolvedValue();
  });
  it('should return status 204 if deleted successfully', async () => {
    await controller.deleteAlbum(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
  });
});

describe('rename Album', () => {
  let req, res, next, album;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    album = { _id: mongoose.Types.ObjectId() };
    req = {
      body: { name: 'albumNewName' },
      params: { id: mongoose.Types.ObjectId() }
    };
    Album.findByIdAndUpdate = jest.fn().mockResolvedValue(album);
  });
  it('should return status 200 if renamed album successfully', async () => {
    await controller.renameAlbum(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(album);
  });
});

describe('prepare multipart for album image upload', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = {
      body: { name: 'albumNewName' },
      params: { id: mongoose.Types.ObjectId() }
    };
  });
  it('should not throw an error', async () => {
    await controller.multiPart(req, res, next);
  });
});
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
    const albumId = mongoose.Types.ObjectId();
    req = mockPageRequest(`/api/v1/albums/${albumId}/tracks`);
    req.params.id = albumId;
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
    expect(res.json).toHaveBeenCalledWith({
      tracks: expect.objectContaining({ items: query })
    });
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

describe('addAlbum', () => {
  let req, res, next, album;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    album = { _id: mongoose.Types.ObjectId() };
    req = {
      body: {},
      user: { id: mongoose.Types.ObjectId() },
      get: jest.fn(),
      files: { image: [{ filename: 'imagename' }] }
    };

    Album.create = jest.fn().mockResolvedValue(album);
    controller.prepareAndSaveImage = jest.fn().mockReturnValue('imageName');
  });
  it('should return status 200 if created successfully', async () => {
    await controller.createAlbum(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(album);
  });
  it('should return status 200 if created album successfully', async () => {
    req.body.image = 'imageBufferData';
    await controller.createAlbum(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(album);
  });
});

describe('resize album image', () => {
  let req, res, next, album;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    req = {
      files: { image: [{}] }
    };
    controller.prepareAndSaveImage = jest.fn().mockReturnValue('imageName');
  });
  it('should call put the image name in req object', async () => {
    await controller.resizeImage(req, res, next);
    expect(req.files.image[0].filename).toEqual('imageName');
  });
  it('should call the next function if not files in the req object', async () => {
    req.files = undefined;
    await controller.resizeImage(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
