const Track = require('../../../models/trackModel');
const mongoose = require('mongoose');

describe('track get preview url method', () => {
  it('should get preview url for the track', async () => {
    const track = new Track({});
    const host = 'http://localhost/';
    expect(track.getPreviewUrl(host)).toEqual(
      `${host}api/v1/me/player/tracks/${track.id}`
    );
  });
  it('should return empty string when host is not provided', async () => {
    const track = new Track({});
    expect(track.getPreviewUrl()).toEqual('');
  });
});
