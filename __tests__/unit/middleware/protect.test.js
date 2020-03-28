const { User } = require('../../../models/userModel');
const { protect } = require('../../../controllers/authController');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  let req, res, next, user;
  const exec = async () => {
    res = {};
    next = jest.fn();
    await protect(req, res, next);
  };

  it('should populate request with user if a valid token provided', async () => {
    user = { _id: mongoose.Types.ObjectId() };
    User.findById = jest.fn().mockReturnValue(user);
    user.changedPasswordAfter = jest.fn().mockReturnValue(false);
    process.env.JWT_SECRET_KEY = 'testingkey';
    process.env.JWT_VALID_FOR = '30d';
    const token = new User(user).signToken();
    req = {
      headers: { authorization: 'Bearer ' + token }
    };

    await exec();

    expect(req.user).toMatchObject(user);
  });

  it('should return unauthorized if auth header isnot set', async () => {
    req.headers = {};

    await exec();

    expect(next).toBeCalledWith(expect.objectContaining(/access/));
  });

  it('should return unauthorized if user no longer in the DB', async () => {
    User.findById = jest.fn().mockReturnValue(null);

    await exec();

    expect(next).toBeCalledWith(expect.objectContaining(/no longer exist/));
  });

  it('should return unauthorized if user changed password and needs re login', async () => {
    user.changedPasswordAfter = jest.fn().mockReturnValue(true);

    await exec();

    expect(next).toBeCalledWith(expect.objectContaining(/log in again/));
  });
});
