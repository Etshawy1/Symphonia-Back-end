const { User } = require('../../../models/userModel');
const { protect } = require('../../../controllers/authController');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');

describe('auth middleware', () => {
  let req, res, next, user;

  beforeAll(() => {
    process.env.JWT_SECRET_KEY = 'testingkey';
    process.env.JWT_VALID_FOR = '30d';
    user = { _id: mongoose.Types.ObjectId(), premium: true };
    res = {};
    next = jest.fn();
  });
  beforeEach(() => {
    const token = new User(user).signToken();
    req = {
      headers: { authorization: 'Bearer ' + token }
    };
    User.findById = jest.fn().mockReturnValue(user);
    user.changedPasswordAfter = jest.fn().mockReturnValue(false);
  });

  it('should populate request with user if a valid token provided', async () => {
    await protect(true)(req, res, next);

    expect(req.user).toMatchObject(user);
  });
  it('should call next without errors if it is non protective (store user data only if there was a token)', async () => {
    req.headers.authorization = undefined;
    await protect(false)(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('should return unauthorized if auth header is not set', async () => {
    req.headers = {};

    await protect(true)(req, res, next);

    const error = new AppError(
      'You are not logged in! Please log in to get access.',
      401
    );
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return unauthorized if user no longer in the DB', async () => {
    User.findById = jest.fn().mockReturnValue(null);

    await protect(true)(req, res, next);

    const error = new AppError(
      'The user belonging to this token does no longer exist.',
      401
    );
    expect(next).toHaveBeenCalledWith(error);
  });
  it('should check if user premium has expired', async () => {
    user.preiumExpires = Date.now() - 10000;
    user.save = jest.fn();
    await protect(true)(req, res, next);
    expect(user.premium).toEqual(false);
  });
  it('should return unauthorized if user changed password and needs re login', async () => {
    user.changedPasswordAfter = jest.fn().mockReturnValue(true);

    await protect(true)(req, res, next);

    const error = new AppError(
      'User recently changed password! Please log in again.',
      401
    );
    expect(next).toHaveBeenCalledWith(error);
  });
});
