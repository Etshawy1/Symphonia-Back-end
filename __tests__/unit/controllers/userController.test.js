const controller = require('../../../controllers/userController');
const { User } = require('../../../models/userModel');
const mongoose = require('mongoose');
const { mockResponse } = require('../../utils/Requests');

describe('set Token', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = {
      user: { id: mongoose.Types.ObjectId() },
      body: { token: 'userToken' }
    };
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(req.user);
  });
  it('should return status 200 if renamed track successfully', async () => {
    await controller.setToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: req.user });
  });
});
