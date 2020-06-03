const controller = require('../../../controllers_v2/followController');
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

describe('get User\'s Followed Artists', () => {
  let req, res, next, artists;
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
    req.user.save = jest.fn();

    artists = [{_id:1},{_id:2},{_id:3}];
    User.findOne = mockQuery({followedUsers: artists});
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
    });
  it('should return the User\'s followed artists', async () => {
    await controller.getUserFollowedArtists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(Responser.getPaging(artists, 'artists', req));
  });
});