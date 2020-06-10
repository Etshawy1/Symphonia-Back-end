const controller = require('../../../controllers/searchController');
const SearchHistory = require('../../../models/searchHistoryModel');
const AppError = require('../../../utils/appError');
const {
  mockResponse,
  mockQuery,
  mockPageRequest
} = require('../../utils/Requests');

describe('search generic', () => {
  let req, res, next, queryOutput;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = { params: { keyword: 'searchKeyword' }, query: {} };
    queryOutput = [{ _id: 1 }, { _id: 2 }];
    controller.getSearchQuery = jest.fn().mockReturnValue(queryOutput);
  });
  it('should return arrays of the fundamental models like (artists, tracks, albums...etc)', async () => {
    await controller.searchGeneric(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      albums: queryOutput,
      artists: queryOutput,
      category: queryOutput,
      playlist: queryOutput,
      profiles: queryOutput,
      tracks: queryOutput
    });
  });
});

describe('search Type', () => {
  let req, res, next, queryOutput;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    req.params = { keyword: 'searchKeyword' };
    req.query = { q: 'keyword' };
    queryOutput = [{ _id: 1 }, { _id: 2 }];
    controller.getSearchQuery = jest.fn().mockReturnValue(queryOutput);
  });
  it('should return artist objects matching the provided key', async () => {
    req.query.type = 'artist';
    await controller.searchType(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      artist: expect.objectContaining({ items: queryOutput })
    });
  });

  it('should return playlist objects matching the provided key', async () => {
    req.query.type = 'playlist';
    await controller.searchType(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      playlist: expect.objectContaining({ items: queryOutput })
    });
  });

  it('should return track objects matching the provided key', async () => {
    req.query.type = 'track';
    await controller.searchType(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      track: expect.objectContaining({ items: queryOutput })
    });
  });
  it('should return error if keyword is not provided', async () => {
    req.query.q = undefined;
    await controller.searchType(req, res, next);
    const error = new AppError('missing q query parameter', 400);
    expect(next).toHaveBeenCalledWith(error);
  });
  it('should return error if query type is not provided', async () => {
    req.query.q = 'keyword';
    req.query.type = undefined;
    await controller.searchType(req, res, next);
    const error = new AppError(
      'missing type query parameter or type not supported',
      400
    );
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('get search history', () => {
  let req, res, next, queryOutput;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    queryOutput = { _id: 1 };
    SearchHistory.find = mockQuery(queryOutput);
  });
  it('should return search history of current user', async () => {
    await controller.getSearchHistory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      history: expect.objectContaining({ items: queryOutput })
    });
  });
});
