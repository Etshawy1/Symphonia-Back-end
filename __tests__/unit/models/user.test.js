const _ = require('lodash');
const { User, validate } = require('../../../models/userModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

describe('user.correctPasswrod', () => {
  it('should return true if the passed hashed and plain password are equal', async () => {
    plainPassword = 'password';
    hashedPassword = await bcrypt.hash(plainPassword, 8);
    user = new User({ password: hashedPassword });
    expect(
      await user.correctPassword(plainPassword, user._doc.password)
    ).toEqual(true);
  });

  it('should return false if the passed hashed and plain password are not equal', async () => {
    plainPassword = 'password';
    hashedPassword = await bcrypt.hash(plainPassword, 8);
    user = new User({ password: hashedPassword });
    expect(
      await user.correctPassword('plainPassword', user._doc.password)
    ).toEqual(false);
  });
});

describe('user.createPasswordResetToken', () => {
  it('should return a valid crypto hex token which is valid for only ten minutes', () => {
    const user = new User({});
    resetToken = user.createPasswordResetToken();
    expect(new Date(user.passwordResetExpires).getTime()).toBeLessThanOrEqual(
      Date.now() + 60 * 60 * 1000
    );
    expect(user.passwordResetToken).toBeDefined();
  });
});

describe('user.changedPasswordAfter', () => {
  it('should return true when time passed is less than stored', () => {
    const currentTime = Date.now();
    const user = new User({ passwordChangedAt: currentTime });
    JWTTimestamp = currentTime / 1000 - 1; // as it should be in seconds
    expect(user.changedPasswordAfter(JWTTimestamp)).toEqual(true);
  });

  it('should return false when time passed comes after the stored', () => {
    const currentTime = Date.now();
    const user = new User({ passwordChangedAt: currentTime });
    JWTTimestamp = currentTime / 1000 + 1; // as it should be in seconds
    expect(user.changedPasswordAfter(JWTTimestamp)).toEqual(false);
  });

  it('should return false when no time is stored in the object', () => {
    const currentTime = Date.now();
    const user = new User({});
    JWTTimestamp = currentTime / 1000; // as it should be in seconds
    expect(user.changedPasswordAfter(JWTTimestamp + 1)).toEqual(false);
    expect(user.changedPasswordAfter(JWTTimestamp - 1)).toEqual(false);
  });
});

describe('validateUser', () => {
  const user = {
    name: 'test',
    email: 'example@example.com',
    emailConfirm: 'example@example.com',
    password: 'password',
    dateOfBirth: '1999-12-31',
    gender: 'male',
    type: 'user'
  };
  it('should not throw an exception', () => {
    expect(validate(user)).resolves.toMatchObject(
      _.omit(user, ['dateOfBirth', 'passwordConfirm'])
    );
  });

  it('should throw an exception missing some required field', () => {
    properties = ['name', 'email', 'password', 'dateOfBirth', 'gender'];
    properties.forEach(property => {
      newUser = _.omit(user, property);
      expect(validate(newUser)).rejects.toThrow(`"${property}" is required`);
    });
  });

  it('should throw an exception that name is in wrong format', () => {
    newUser = { ...user };
    newUser.name = 't';
    expect(validate(newUser)).rejects.toThrow(/3/);
    arr = new Array(35); // to make a string of  more than 30 char(max name length)
    newUser.name = arr.join('a');
    expect(validate(newUser)).rejects.toThrow(/30/);
  });
});

describe('signToken', () => {
  it('should return a valid jwt token', async () => {
    const user = new User({ _id: mongoose.Types.ObjectId() });
    process.env.JWT_SECRET_KEY = 'testingkey';
    process.env.JWT_VALID_FOR = '30d';
    const token = user.signToken();
    expect(token).toBeDefined();
  });
});

describe('createPremiumToken', () => {
  it('should return a valid token', async () => {
    const user = new User({ _id: mongoose.Types.ObjectId() });
    const token = user.createPremiumToken();
    expect(token).toBeDefined();
  });
});

describe('createPlayerToken', () => {
  it('should return a valid token', async () => {
    const user = new User({ _id: mongoose.Types.ObjectId() });
    const token = user.createPlayerToken();
    expect(token).toBeDefined();
  });
});
