const controller = require('../../../controllers/playlistController');
const Playlist = require('../../../models/playlistModel');
const Track = require('../../../models/trackModel');
const { User } = require('../../../models/userModel');
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
  });
  it('Should upload playlist cover image', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      collaborative: true,
      public: true
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Playlist.findByIdAndUpdate = jest.fn().mockReturnValue(playlist);
    await controller.uploadCustomPlaylistCoverImage(req, res, next);
    expect(res.send).toHaveBeenCalledWith(playlist);
  });

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
  it('Should upload playlist cover image', async () => {
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      collaborative: true,
      public: true
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Playlist.findByIdAndUpdate = jest.fn().mockReturnValue(playlist);
    await controller.uploadCustomPlaylistCoverImage(req, res, next);
    expect(res.send).toHaveBeenCalledWith(playlist);
  });

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

describe('createPlaylist', () => {
  let req, res, next, playlist, query, user;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = {
      params: { id: mongoose.Types.ObjectId() },
      query: {},
      protocol: String,
      body: {
        collaborative: Boolean,
        public: Boolean,
        description: String,
        name: String,
        followers: mongoose.Types.ObjectId(),
        category: mongoose.Types.ObjectId(),
        images: [String]
      }
    };
    req.get = jest.fn();
  });

  it('Should Create Playlist', async () => {
    user = { name: 'Omar' };
    User.findById = jest.fn().mockReturnValue(user);
    User.findByIdAndUpdate = jest.fn().mockReturnValue(user);
    playlist = { _id: mongoose.Types.ObjectId() };
    Playlist.populate = jest.fn().mockReturnValue(playlist);
    Playlist.create = jest.fn().mockReturnValue(playlist);
    await controller.createPlaylist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(playlist);
  });
  it('Should return Error for Wrong User', async () => {
    User.findById = jest.fn().mockReturnValue(null);
    await controller.createPlaylist(req, res, next);
    const error = new AppError('invalid user ID', 400);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('removePlaylistTracks', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
  });

  it('Should return error if playlist id not found', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() }
    };
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.removePlaylistTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(
      'The playlist with the given ID was not found.'
    );
  });

  it('Should return error if playlist is Restricted', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() }
    };
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: mongoose.Types.ObjectId
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.removePlaylistTracks(req, res, next);
    const error = new AppError('This playlist is restricted', 401);
    expect(next).toHaveBeenCalledWith(error);
  });
  it('Should return error if Tracks ids is not provided', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() },
      body: { images: [String] },
      query: {}
    };
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    await controller.removePlaylistTracks(req, res, next);
    const error = new AppError('missing ids of tracks to delete', 400);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('maintainPlaylistTracks', () => {
  let req, res, next, playlist, query, track;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
  });
  it('Should detect Error in Input dimensions', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() },
      body: { rangeStart: 10, rangeLength: 10, insertBefore: 10 }
    };
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      collaborative: true,
      public: true,
      tracks: [
        { _id: mongoose.Types.ObjectId() },
        { _id: mongoose.Types.ObjectId() }
      ]
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Playlist.findByIdAndUpdate = jest.fn().mockReturnValue(playlist);
    await controller.maintainPlaylistTracks(req, res, next);
    const error = new AppError('the dimensions are not correct', 400);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('Should return error if playlist id not found', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() }
    };
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.maintainPlaylistTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(
      'The playlist with the given ID was not found.'
    );
  });

  it('Should change playlist Tracks', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() },
      body: { tracks: mongoose.Types.ObjectId() }
    };
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      tracks: [mongoose.Types.ObjectId()]
    };
    track = [{ _id: mongoose.Types.ObjectId() }];
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Track.findById = jest.fn().mockReturnValue(track);
    Playlist.findByIdAndUpdate = jest.fn().mockReturnValue(playlist);
    await controller.maintainPlaylistTracks(req, res, next);
    expect(res.send).toHaveBeenCalledWith(playlist);
  });

  it('Should return Error for unfounded Tracks', async () => {
    req = {
      params: { id: mongoose.Types.ObjectId() },
      user: { id: mongoose.Types.ObjectId() },
      body: { tracks: [mongoose.Types.ObjectId()] }
    };
    playlist = {
      _id: mongoose.Types.ObjectId(),
      owner: req.user.id,
      public: true,
      collaborative: true,
      tracks: [mongoose.Types.ObjectId()]
    };
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Track.findById = jest.fn().mockReturnValue(null);
    Playlist.findByIdAndUpdate = jest.fn().mockReturnValue(playlist);
    await controller.maintainPlaylistTracks(req, res, next);
    const error = new AppError('this track was not found', 404);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('addTracksToPlaylist', () => {
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

  it('Should return error if playlist id not found', async () => {
    Playlist.findById = jest.fn().mockReturnValue(null);
    await controller.addTracksToPlaylist(req, res, next);
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
    await controller.addTracksToPlaylist(req, res, next);
    const error = new AppError('This playlist is restricted.', 401);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getCurrentUserDeletedPlaylists', () => {
  let req, res, next, query;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.params = { id: mongoose.Types.ObjectId() };
    req.user = { id: mongoose.Types.ObjectId() };
    query = mockQuery();
    Playlist.findDeleted = jest.fn().mockReturnValue(query);
  });

  it('Should restore playlist ', async () => {
    await controller.getCurrentUserDeletedPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      playlists: expect.objectContaining({ items: query })
    });
  });
});

describe('getPlaylistTracks', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = mockPageRequest();
    req.params = { id: mongoose.Types.ObjectId() };
    req.query = {};
    playlist = { _id: mongoose.Types.ObjectId() };
    query.populate = jest.fn();
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Track.find = jest.fn().mockReturnValue(query);
    Track.populate = jest.fn();
  });

  it('Should return playlist tracks', async () => {
    await controller.getPlaylistTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      tracks: expect.objectContaining({ items: query })
    });
  });
  it('Should return error if playlist does not exist', async () => {
    Playlist.findById = jest.fn().mockReturnValue(undefined);
    await controller.getPlaylistTracks(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('that document does not exist', 404)
    );
  });
});

describe('getCurrentUserOwnedPlaylists', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = mockPageRequest();
    req.params = { id: mongoose.Types.ObjectId() };
    req.query = {};
    playlist = { _id: mongoose.Types.ObjectId() };
    query.populate = jest.fn().mockReturnValue(query);
    User.findById = jest.fn().mockReturnValue({});
    Playlist.find = jest.fn().mockReturnValue(query);
  });

  it('Should return current user owned playlists', async () => {
    await controller.getCurrentUserOwnedPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      playlists: expect.objectContaining({ items: query })
    });
  });
});

describe('getCurrentUserPlaylists', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = mockPageRequest();
    req.params = { id: mongoose.Types.ObjectId() };
    req.query = {};
    req.user = {};
    playlist = { _id: mongoose.Types.ObjectId() };
    query.populate = jest.fn().mockReturnValue(query);
    User.findById = jest.fn().mockReturnValue({});
    Playlist.find = jest.fn().mockReturnValue(query);
  });

  it('Should return current user playlists', async () => {
    await controller.getCurrentUserPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      playlists: expect.objectContaining({ items: query })
    });
  });
});

describe('getUserPlaylists', () => {
  let req, res, next, playlist, query;
  beforeAll(() => {
    res = mockResponse();
    query = mockQuery();
    next = jest.fn();
    req = mockPageRequest();
    req.params = { id: mongoose.Types.ObjectId() };
    req.query = {};
    req.user = {};
    playlist = { _id: mongoose.Types.ObjectId() };
    query.populate = jest.fn().mockReturnValue(query);
    User.findById = jest.fn().mockReturnValue({ _id: '1' });
    Playlist.find = jest.fn().mockReturnValue(query);
  });

  it('Should return a user playlists', async () => {
    await controller.getUserPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      playlists: expect.objectContaining({ items: query })
    });
  });
  it('Should return error if user does not exist', async () => {
    User.findById = jest.fn().mockReturnValue(undefined);
    await controller.getUserPlaylists(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError(`the user does not exists`, 404)
    );
  });
});
