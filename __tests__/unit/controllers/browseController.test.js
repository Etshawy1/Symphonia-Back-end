const controller = require('../../../controllers/browseController');
const Track = require('../../../models/trackModel');
const Category = require('../../../models/categoryModel');
const Playlist = require('../../../models/playlistModel');
const { User } = require('../../../models/userModel');
const Responser = require('../../../utils/responser');
const Helper = require('../../../utils/helper');
const mongoose = require('mongoose');
const AppError = require('../../../utils/appError');
const _ = require('lodash');
const sharp = jest.genMockFromModule('sharp');
const {
  mockResponse,
  mockQuery,
  mockPageRequest
} = require('../../utils/Requests');
const Album = require('../../../models/albumModel');
describe('getCategory', () => {
  let req, res, next, playlists;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const id = 'rocky_has_12';
    category = {};
    category.id = id;
    category.select = jest.fn();
    req = { params: { id: category.id } };

    Category.findOne = jest.fn().mockReturnValue(category);
  });
  it('should return a category if the id exists', async () => {
    await controller.getCategory(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(category);
  });
});

describe('get Paging object of list of categories', () => {
  let req, res, next, categories;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest('api/v1/browse/categories');
    pageMeta = Helper.getPageMeta(req);
    categories = [{ id: 1 }, { id: 2 }, { id: 3 }];

    Category.find = mockQuery(categories);
  });
  it('should return the categories', async () => {
    await controller.getCategories(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      Responser.getPaging(
        categories,
        'categories',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
  });

  it('should return the categories at offset 1 and limit 1', async () => {
    req.query = { limit: 1, offset: 1 };
    exCats = [categories[1]];
    Category.find = mockQuery(exCats);
    await controller.getCategories(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      Responser.getPaging(
        exCats,
        'categories',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
  });
});

describe("get Category's playlists", () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const id = 'rocky_has_12';
    category = { id, _id: 1 };
    category.select = jest.fn().mockReturnValue(category);
    req = mockPageRequest();
    req.params = {
      id: category.id
    };
    Category.findOne = jest.fn().mockReturnValue(category);
    playlists = [{ id: 1 }, { id: 2 }, { id: 3 }];
    Playlist.find = mockQuery(playlists);
    pageMeta = Helper.getPageMeta(req);
  });
  it('should return the playlists in a certain category', async () => {
    await controller.getCategoriesPlaylists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      Responser.getPaging(
        playlists,
        'playlists',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
  });
  it('should return that category isn\'t found', async () => {
    Category.findOne = jest.fn().mockReturnValue(undefined);

    await controller.getCategoriesPlaylists(req, res, next);
   expect(next).toHaveBeenCalledWith(new AppError("category is n't found ", 404));
  });
});

describe('get Newly Released Albums', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    req = mockPageRequest();
    albums = [{ id: 1 }, { id: 2 }, { id: 3 }];
    Album.find = mockQuery(albums);
    pageMeta = Helper.getPageMeta(req);
  });
  it('should return the playlists in a certain category', async () => {
    await controller.getNewRelease(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      albums: expect.objectContaining({ items: albums })
    });
  });
});

// TODO: there is a problem when assisnging to User.find()
// NOTE: the problem seems with using exports instead of module.exports

describe('get Recommended Artists', () => {
  let req, res, next;
  beforeAll(() => {
    res = mockResponse();
    next = jest.fn();
    const id = 'rocky_has_12';
    category = { id, _id: 1 };
    category.select = jest.fn().mockReturnValue(category);
    req = mockPageRequest('api/v1/browse/artists');
    req.user.followedUsers = []; // any empty array
    Category.findOne = jest.fn().mockReturnValue(category);
    artists = [{ id: 1 }, { id: 2 }, { id: 3 }];
    User.find = mockQuery(artists);
    pageMeta = Helper.getPageMeta(req);
  });
  it('should return the playlists in a certain category', async () => {
    await controller.getRecommendedArtists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      Responser.getPaging(
        artists,
        'artists',
        req,
        pageMeta.limit,
        pageMeta.offset
      )
    );
  });
});
