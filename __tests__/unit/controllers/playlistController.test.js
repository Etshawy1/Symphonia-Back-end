const controller = require('../../../controllers/playlistController');
const Playlist = require('../../../models/playlistModel');
const Track = require('../../../models/trackModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse, mockPageRequest } = require('../../utils/Requests');
const { mockQuery } = require('../../utils/apiFeatures');

describe('getPlaylist', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      query: {}
    };
    playlist = { _id: mongoose.Types.ObjectId() };
    query.populate = jest.fn().mockReturnValue(playlist);
    Playlist.findById = jest.fn().mockReturnValue(query);
  });

  it('Should return an playlist ', async () => {
    await controller.getPlaylist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(playlist);
  });

  it('Should return error if playlist id not found', async () => {
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.getPlaylistTracks(req, res, next);
    const error = new AppError('that document does not exist', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('recoverCurrentUserPlaylists', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() }
    };
    playlist = {
      _id: mongoose.Types.ObjectId(),
      nModified: 1
    };
    Playlist.restore = jest.fn().mockReturnValue(playlist);
  });

  it('Should restore playlist ', async () => {
    await controller.recoverCurrentUserPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    let query = { recoveredPlaylistCount: playlist.nModified };
    expect(res.json).toHaveBeenCalledWith(query);
  });
});

describe('deletePlaylist', () => {
  let req, res, next, playlist, query, owner;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() }
    };
    owner = req.user.id;
    playlist = { _id: mongoose.Types.ObjectId() };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    playlist.delete = jest.fn().mockReturnValue(null);
  });

  it('Should delete a playlist ', async () => {
    await controller.deletePlaylist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('Should return error if playlist id not found', async () => {
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.deletePlaylist(req, res, next);
    const error = new AppError('the document was not found', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getRandomPlaylist', () => {
  let req, res, next, playlist, query, num, results;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    // Generate Random Number from 1 to 10 to simulate the user input number
    num = Math.floor(Math.random() * 10 + 1);
    req = {
      query: { number: num }
    };
    playlist = [
      { _id: mongoose.Types.ObjectId() },
      { _id: mongoose.Types.ObjectId() }
    ];
    var size = Object.keys(playlist).length;
    results = [];
    // give exactly the Input number of playlists or all the playlists
    if (req.query.number < size) {
      for (let index = 0; index < num; index++) {
        results.push(playlist[index]);
      }
    } else results = playlist.slice();

    Playlist.aggregate = jest.fn().mockReturnValue(results);
  });
  it('Should return Rand playlists ', async () => {
    await controller.getRandomPlaylist(req, res, next);
    expect(res.send).toHaveBeenCalledWith(results);
  });
});

describe('uploadCustomPlaylistCoverImage', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() },
      body: { images: [String] }
    };
    playlist.save = jest.fn().mockReturnValue(playlist);
    Playlist.findByIdAndUpdate = jest.fn.mockReturnValue(playlist);
  });
  /* it('Should upload playlist cover image', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      collaborative: true,
      public: true
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.uploadCustomPlaylistCoverImage(req, res, next);
    expect(res.send).toHaveBeenCalledWith(playlist);
  }); */

  it('Should return error if playlist id not found', async () => {
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.uploadCustomPlaylistCoverImage(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(
      'The playlist with the given ID was not found.'
    );
  });

  it('Should return error if playlist is Restricted', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: mongoose.Types.ObjectId
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.uploadCustomPlaylistCoverImage(req, res, next);
    const error = new AppError('This playlist is restricted.', 401);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('changePlaylistDetails', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() },
      body: { images: [String] }
    };
  });
  /* it('Should upload playlist cover image', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      collaborative: true,
      public: true
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Playlist.findByIdAndUpdate = jest.fn.mockReturnValue(playlist);
    await controller.uploadCustomPlaylistCoverImage(req, res, next);
    expect(res.send).toHaveBeenCalledWith(playlist);
  }); */

  it('Should return error if playlist id not found', async () => {
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.changePlaylistDetails(req, res, next);
    const error = new AppError(
      'The playlist with the given ID was not found.',
      404
    );
    expect(next).toHaveBeenCalledWith(error);
  });

  it('Should return error if playlist is Restricted', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: mongoose.Types.ObjectId
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.changePlaylistDetails(req, res, next);
    const error = new AppError('This playlist is restricted.', 401);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getPlaylistCoverImage', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() }
    };
  });

  it('Should return playlist cover image', async () => {
    playlist = {
      images: 'Cover Image',
      owner: req.user.id,
      public: true
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.getPlaylistCoverImage(req, res, next);
    expect(res.send).toHaveBeenCalledWith(playlist.images);
  });

  it('Should return error if playlist id not found', async () => {
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.getPlaylistCoverImage(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(
      'The playlist with the given ID was not found.'
    );
  });

  it('Should return error if playlist is Restricted', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: mongoose.Types.ObjectId
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.getPlaylistCoverImage(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('This playlist is not Public');
  });
});
