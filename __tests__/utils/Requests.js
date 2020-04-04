module.exports.mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
module.exports.mockRequest = body => ({
  body
});
describe('dumb', () => {
  it('is a utility function for test only', () => {
    expect(1).toEqual(1);
  });
});
