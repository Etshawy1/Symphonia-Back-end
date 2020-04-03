const controller = require('../../../controllers/authController');
const { User } = require('../../../models/userModel');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const { mockResponse } = require('../../utils/Requests');
const Email = require('../../../utils/email');

describe('checkEmail', () => {
  let req, res, next, user;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    user = {
      _id,
      type: 'user'
    };
    req = { body: { email: 'test@test.com' } };
    User.findOne = jest.fn().mockReturnValue(user);
  });
  it('should return the user with its type if email exists', async () => {
    await controller.checkEmail(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ exists: true, type: user.type });
  });
  it('should return the user does not exist', async () => {
    User.findOne = jest.fn().mockReturnValue(null);

    await controller.checkEmail(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ exists: false });
  });
  it('should return error if request body missing email', async () => {
    req.body.email = undefined;

    await controller.checkEmail(req, res, next);

    const error = new AppError('Please provide an email to check', 400);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('resetPassword', () => {
  let req, res, next, user, newToken;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    newToken = 'new-jwt-generated-token-after-pass-change';
    user = {
      _id,
      email: 'test@test.com',
      save: jest.fn().mockResolvedValue(true),
      signToken: jest.fn().mockReturnValue(newToken)
    };
    req = {
      body: { password: 'password', passwordConfirm: 'password' },
      params: { token: 'backendprovidedtoken' }
    };
    User.findOne = jest.fn().mockReturnValue(user);
  });
  it('should respond with the user data and a new JWT token', async () => {
    await controller.resetPassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user, token: newToken });
  });
  it('should respond with the reset token expired if token expired or no matching token in the db', async () => {
    User.findOne = jest.fn().mockReturnValue(null);

    await controller.resetPassword(req, res, next);

    const error = new AppError('Token is invalid or has expired', 400);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('updatePassword', () => {
  let req, res, next, user, newToken;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    newToken = 'new-jwt-generated-token-after-pass-change';
    user = {
      _id,
      email: 'test@test.com',
      password: 'password',
      correctPassword: jest.fn().mockResolvedValue(true),
      save: jest.fn().mockResolvedValue(true),
      signToken: jest.fn().mockReturnValue(newToken)
    };
    req = {
      user: { id: user._id },
      body: {
        passwordCurrent: 'password',
        password: 'newpassword',
        passwordConfirm: 'newpassword'
      }
    };
    const mockObj = { select: jest.fn().mockReturnValue(user) };
    User.findById = jest.fn().mockReturnValue(mockObj);
  });
  it('should respond with the user data and a new JWT token if current password is valid', async () => {
    await controller.updatePassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user, token: newToken });
  });
  it('should respond with 401 if the current password is wrong', async () => {
    user.correctPassword = jest.fn().mockReturnValue(null);

    await controller.updatePassword(req, res, next);

    const error = new AppError('Your current password is wrong.', 401);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('GoogleOauthCallback', () => {
  let req, res, next, user, newToken;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    newToken = 'new-jwt-generated-token-after-pass-change';
    user = {
      _id,
      signToken: jest.fn().mockReturnValue(newToken),
      status: 201,
      name: 'test'
    };
    req = {
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
      user
    };
  });
  it('should return user data with token', async () => {
    const email = new Email(req.user, 'url');
    await controller.googleOauth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user, token: newToken });
  });
});

describe('FacebookOauthCallback', () => {
  let req, res, next, user, newToken;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
    const _id = mongoose.Types.ObjectId();
    newToken = 'new-jwt-generated-token-after-pass-change';
    user = {
      _id,
      signToken: jest.fn().mockReturnValue(newToken),
      status: 201,
      name: 'test'
    };
    req = {
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
      user
    };
  });
  it('should return user data with token', async () => {
    const email = new Email(req.user, 'url');
    await controller.facebookOauth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user, token: newToken });
  });
});
