const { User } = require('../../../models/userModel');
const { restrictTo } = require('../../../controllers/authController');
const mongoose = require('mongoose');

describe('authorization middleware', () => {
  it('should call the next function if user is authorized', () => {
    const req = { user: { role: 'user' } };
    const res = {};
    const next = jest.fn();
    restrictTo('admin', 'user')(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should return with message that user is unauthorized', () => {
    const req = { user: { role: 'user' } };
    const res = {};
    const next = jest.fn();
    restrictTo('admin')(req, res, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining(/do not have permission/)
    );
  });
});
