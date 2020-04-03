const { restrictTo } = require('../../../controllers/authController');
const AppError = require('../../../utils/appError');

describe('authorization middleware', () => {
  it('should call the next function if user is authorized', () => {
    const req = { user: { type: 'user' } };
    const res = {};
    const next = jest.fn();
    restrictTo('admin', 'user')(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should return with message that user is unauthorized', () => {
    const req = { user: { type: 'user' } };
    const res = {};
    const next = jest.fn();
    restrictTo('admin')(req, res, next);
    const error = new AppError(
      'You do not have permission to perform this action',
      403
    );
    expect(next).toHaveBeenCalledWith(error);
  });
});
