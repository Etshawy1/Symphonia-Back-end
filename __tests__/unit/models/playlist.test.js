const Playlist = require('../../../models/playlistModel');

describe('playlist get track count virual property', () => {
  it('should return length of tracks in the playlist', async () => {
    const playlist = new Playlist({ tracks: ['track1, track2'] });
    expect(playlist.tracksCount).toEqual(playlist.tracks.length);
  });
});
