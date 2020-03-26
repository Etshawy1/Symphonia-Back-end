const { User } = require('../../../models/userModel');
const { protect } = require('../../../controllers/authController');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should populate request with user if a valid token provided', async () => {
    process.env.JWT_SECRET_KEY = 'testingkey';
    process.env.JWT_VALID_FOR = '30d';
    const user = { _id: mongoose.Types.ObjectId() };
    User.findById = jest.fn().mockReturnValue(user);
    user.changedPasswordAfter = jest.fn().mockReturnValue(false);
    const token = new User(user).signToken();
    let req = {
      headers: { authorization: 'Bearer ' + token }
    };
    const res = {};
    const next = jest.fn();
    protect(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
