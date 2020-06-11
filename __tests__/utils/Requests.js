const URL = require('url');
require('dotenv').config();

module.exports.mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
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

module.exports.mockQuery = function (arr) {
  let query = (async () => {
    return arr;
  })();
  query.find = jest.fn().mockReturnValue(query);
  query.select = jest.fn().mockReturnValue(query);
  query.sort = jest.fn().mockReturnValue(query);
  query.skip = jest.fn().mockReturnValue(query);
  query.limit = jest.fn().mockReturnValue(query);
  query.populate = jest.fn().mockReturnValue(query);
  query.offset = jest.fn().mockReturnValue(query);
  query.then = jest.fn().mockReturnValue(query);
  query.catch = jest.fn().mockReturnValue(query);

  return jest.fn().mockReturnValue(query);
};

module.exports.mockPageRequest = originalUrl => {
  addr =
    process.env.LOCAL_HOST.replace('<PORT>', process.env.PORT) + originalUrl;
  let q = URL.parse(addr);
  return {
    user: {},
    params: {},
    query: {},
    originalUrl: q.pathname,
    protocol: q.protocol,
    get: jest.fn().mockReturnValue(q.host),
    body:{}
  };
};
