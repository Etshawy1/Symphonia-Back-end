const controller = require('../../../controllers/searchController');
const Track = require('../../../models/trackModel');

describe('get search query', () => {
  let queryOutput;
  beforeAll(() => {
    queryOutput = { _id: 1 };
    queryOutput.limit = jest.fn().mockReturnValue(queryOutput);
    queryOutput.skip = jest.fn().mockReturnValue(queryOutput);
    queryOutput.populate = jest.fn().mockReturnValue(queryOutput);
    Track.find = jest.fn().mockReturnValue(queryOutput);
  });
  it('should return query containing matching objects from the provided type', async () => {
    expect(
      await controller.getSearchQuery('track', {}, 'keyword', 2, 0, {
        path: ''
      })
    ).toEqual(queryOutput);
  });
  it('should return null if it was called with unsupported type', async () => {
    expect(
      await controller.getSearchQuery('unsupportedType', {}, 'keyword', 2, 0, {
        path: ''
      })
    ).toEqual(null);
  });
});
