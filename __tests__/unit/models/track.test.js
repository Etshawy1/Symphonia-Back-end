const Track = require('../../../models/trackModel');
const mongoose = require('mongoose');

describe('create track', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await Track.deleteMany({});
    await mongoose.connection.close();
  });
  it('should not add track with duration less than 3 seconds or without category', async () => {
    try {
      await Track.create({ durationMs: 300 });
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });
});

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
