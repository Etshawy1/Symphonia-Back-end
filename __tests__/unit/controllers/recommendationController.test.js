const controller = require('../../../controllers/recommendationController');
const Track = require('../../../models/trackModel');
const Category = require('../../../models/categoryModel');
const Helper = require('../../../utils/helper');
const Responser = require('../../../utils/responser');
const _ = require('lodash');
const {
  mockResponse,
  mockQuery,
  mockPageRequest
} = require('../../utils/Requests');

describe('get Availabe Genre Seed', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    categories = [{ id: 1 }, { id: 2 }, { id: 3 }];
    ids = [];
    categories.forEach(Element => {
      ids.push(Element.id);
    });
    Category.find = jest.fn().mockReturnValue({
      select: async () => {
        return categories;
      }
    });
    pageMeta = Helper.getPageMeta(req);
  });
  it('should return the playlists in a certain category', async () => {
    await controller.getAvailabeGenreSeed(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ genres: ids });
  });
});

describe('get Recommended Tracks 1', () => {
  let req, res, next, tracks, limit, offset;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    tracks = [{ id: 1 }, { id: 2 }, { id: 3 }];
    Track.find = mockQuery(tracks);
    pageMeta = Helper.getPageMeta(req);
    limit = 20;
    offset = 0;
  });
  it('should return the playlists in a certain category', async () => {
    await controller.getRecommendedTracks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(Responser.getPaging(tracks, 'tracks', req, limit, offset));
  });
});
