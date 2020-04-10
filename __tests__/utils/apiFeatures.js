module.exports.mockQuery = () => {
  const query = {};
  query.find = jest.fn().mockReturnValue(query);
  query.sort = jest.fn().mockReturnValue(query);
  query.select = jest.fn().mockReturnValue(query);
  query.skip = jest.fn().mockReturnValue(query);
  query.limit = jest.fn().mockReturnValue(query);
  return query;
};
module.exports.mockRequest = body => ({
  body
});
describe('dumb', () => {
  it('is a utility function for test only', () => {
    expect(1).toEqual(1);
  });
});
