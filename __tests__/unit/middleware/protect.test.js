const { User } = require('../../../models/userModel');
const { protect } = require('../../../controllers/authController');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');

describe('auth middleware', () => {
  let req, res, next, user;

  beforeAll(() => {
    process.env.JWT_SECRET_KEY = 'testingkey';
    process.env.JWT_VALID_FOR = '30d';
    user = { _id: mongoose.Types.ObjectId() };
  });
  beforeEach(() => {
    const token = new User(user).signToken();
    req = {
      headers: { authorization: 'Bearer ' + token }
    };
    User.findById = jest.fn().mockReturnValue(user);
    user.changedPasswordAfter = jest.fn().mockReturnValue(false);
  });
  const exec = async () => {
    res = {};
    next = jest.fn();
    await protect(req, res, next);
  };

  it('should populate request with user if a valid token provided', async () => {
    await exec();

    expect(req.user).toMatchObject(user);
  });

  it('should return unauthorized if auth header is not set', async () => {
    req.headers = {};

    await exec();

    const error = new AppError(
      'You are not logged in! Please log in to get access.',
      401
    );
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return unauthorized if user no longer in the DB', async () => {
    User.findById = jest.fn().mockReturnValue(null);

    await exec();

    const error = new AppError(
      'The user belonging to this token does no longer exist.',
      401
    );
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return unauthorized if user changed password and needs re login', async () => {
    user.changedPasswordAfter = jest.fn().mockReturnValue(true);

    await exec();

    const error = new AppError(
      'User recently changed password! Please log in again.',
      401
    );
    expect(next).toHaveBeenCalledWith(error);
  });
});
