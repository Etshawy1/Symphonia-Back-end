const controller = require('../../../controllers/followController');
const Track = require('../../../models/trackModel');
const Category = require('../../../models/categoryModel');
const Playlist = require('../../../models/playlistModel');
const { User } = require('../../../models/userModel');
const { Notification } = require('../../../models/notificationsModel');
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

describe('follow User', () => {
  let req, res, next;
  beforeEach(() => {
    jest.resetModules();

  });
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
    req.query = { ids: '6,7' };
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    req.user.select = jest.fn().mockReturnValue(req.user);
    req.user.save = jest.fn();
    const notification = { _id: '', items: [], save: jest.fn() };
    Notification.create = jest.fn().mockReturnValue(notification);
    Notification.findById = jest.fn().mockReturnValue(notification);
    User.findById = jest.fn().mockReturnValue(req.user);
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
  });
  it('should follow User', async () => {
    await controller.FollowUser(req, res, next);
    expect(req.user.followedUsers).toEqual(
      expect.arrayContaining(['1', '2', '3', '4', '5', '6', '7'])
    );
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalled();
  });
  
  it('should not follow User and display user is already followed message', async () => {
    req.query = { ids: '1,7' };

    await controller.FollowUser(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('user is already followed', 400)
    );        
  });
  it('should return user not found', async () => {
     User.findById = jest.fn().mockReturnValue(undefined);

    await controller.FollowUser(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('this is not a valid user', 400)
    );        
  });
it('should return this is not a valid user', async () => {
  User.findById = jest.fn().mockReturnValue(undefined);
  req.query = { ids: '1,7' };
  mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);
  await controller.FollowUser(req, res, next);
  expect(next).toHaveBeenCalledWith(
    new AppError('invalid ids provided', 400)
  );    
});
  it('should throw invalid ids provided', async () => {
    req.query = { ids: '1,7' };
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);
    await controller.FollowUser(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('invalid ids provided', 400)
    );    
  });

  it('should say ids field is missing', async () => {
    req.query = {  };

    await controller.FollowUser(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('ids field is missing', 400)
    );
  });
});

describe('check If User Follower', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,7' };
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    req.user.save = jest.fn();

    User.findById = jest.fn().mockReturnValue(req.user);
  });
  it('return which users are followed and which are not', async () => {
    await controller.checkIfUserFollower(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([true, true, false]);
  });
  it('return ids field is missing', async () => {
    req.query.ids = undefined;
    await controller.checkIfUserFollower(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('ids field is missing', 400)
    );
  });
});

describe('check If Playlist Follower', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.query = { ids: '1,2,7' };
    req.user.save = jest.fn();
    playlist = { id: '1', followers: ['1', '2', '3', '4', '5'] };
    req.params.id = playlist.id; // playlist id 1
    Playlist.findById = jest.fn().mockReturnValue(playlist);
  });
  it('return which playlists are followed and which are not', async () => {
    await controller.checkIfPlaylistFollower(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([true, true, false]);
  });
  it('return ids field is missing', async () => {
    req.query.ids = undefined;
    await controller.checkIfPlaylistFollower(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('ids field is missing', 400)
    );
  });
});

describe('follow Playlist', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    playlist = { id: '1', followers: ['2', '3'], owner: '' };
    req.params.id = playlist.id;
    req.query = { ids: '6,7' };
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    req.user.save = jest.fn();
    req.user.select = jest.fn().mockReturnValue(req.user);
    const notification = { _id: '', items: [], save: jest.fn() };
    Notification.create = jest.fn().mockReturnValue(notification);
    Notification.findById = jest.fn().mockReturnValue(notification);
    User.findById = jest.fn().mockReturnValue(req.user);
    Playlist.findOne = jest.fn().mockReturnValue(playlist);
    Playlist.findByIdAndUpdate = jest.fn();
  });
  it('should follow playlist', async () => {
    await controller.followPlaylist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('shouldnot follow Plalist and display user is already following the playlist', async () => {
    playlist.followers.push(req.user._id);
    await controller.followPlaylist(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new AppError('already following the playlist', 403)
    );
  });

});

describe('followed playlist count', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    Playlist.count = jest.fn().mockReturnValue(2);
  });
  it('should return the count of followed playlists by user', async () => {
    
    await controller.followedPlaylistCount(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ FollowedPlaylists: 2 });
  });
});

describe('get followed playlist', () => {
  let req, res, next, playlists;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    playlists = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    Playlist.find = mockQuery(playlists);
  });
  it("should return current user's followed playlists ", async () => {
    await controller.followedPlaylist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      playlists: expect.objectContaining({ items: playlists })
    });
  });
});

describe('get User Followed Artists', () => {
  let req, res, next, playlists, limit = 20, offset = 0 ;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest('url');
    req.user = { _id: '1', id: '1', followedUsers: ['1', '2', '3', '4', '5'] };
    User.findOne = mockQuery(req.user)


  });
  it("should return current user's followed artists ", async () => {
    req.query.limit = 'toto'; // it tests if limit isn't a number
   req.query.after = '1';
    await controller.getUserFollowedArtists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      artists: {
        items: req.user.followedUsers
      },
      limit,
      total: req.user.followedUsers.length,
      next: null,
      cursors: {
        after: null
      },
      totalFollowed: req.user.followedUsers.length
    });
  });
});


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

  it('should return ids field not found', async () => {
    req.query.ids = undefined;
    await controller.unfollowUser(req, res, next);
   expect(next).toHaveBeenCalledWith(new AppError('ids field is missing', 400));
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
