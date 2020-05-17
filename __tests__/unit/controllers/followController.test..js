const controller = require('../../../controllers/followController');
const Track = require('../../../models/trackModel');
const Category = require('../../../models/categoryModel');
const Playlist = require('../../../models/playlistModel');
const { User } = require('../../../models/userModel');
const Responser = require('../../../utils/responser');
const Helper = require('../../../utils/helper');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const {
  mockResponse,
  mockQuery,
  mockPageRequest
} = require('../../utils/Requests');
const Album = require('../../../models/albumModel');

describe('unfollow User', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    req.user.save = jest.fn();

    User.findById = jest.fn().mockReturnValue(req.user);
  });
  it('should unfollow User', async () => {
    await controller.unfollowUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalled();
  });
});

describe('unfollow Playlist', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,4' };
    req.user.id = '1';
    req.params = { id: '1' };
    playlist = {
      followers: ['1', '2', '3']
    };
    playlist.save = jest.fn();
    Playlist.findById = jest.fn().mockReturnValue(playlist);
    Playlist.save = jest.fn();
  });
  it('unfollow Playlist', async () => {
    await controller.unfollowPlaylist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalled();
  });
});
