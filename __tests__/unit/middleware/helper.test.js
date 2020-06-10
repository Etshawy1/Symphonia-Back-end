const helper = require('../../../utils/helper');
const Track = require('../../../models/trackModel');

describe('get random string', () => {
  it('should a random string of the specified length', () => {
    const stringLength = 20;
    const stringGenerated = helper.randomStr(stringLength);
    expect(stringGenerated.length).toEqual(stringLength);
  });
});

describe('checkIds', () => {
  it('should return true if provided ids are in the database', async () => {
    Track.find = jest.fn().mockReturnValue(['1', '2', '3']);
    const ids = ['1', '2', '3'];
    expect(await helper.checkIDS(ids, Track)).toEqual(true);
  });

  it('should return false if some provided id is in the database', async () => {
    Track.find = jest.fn().mockReturnValue(['1', '2']);
    const ids = ['1', '2', '3'];
    expect(await helper.checkIDS(ids, Track)).toEqual(false);
  });
});
