const Album = require('../../../models/albumModel');

describe('Album get track count virual property', () => {
  it('should return length of tracks in the album', async () => {
    const album = new Album({ tracks: ['track1, track2'] });
    expect(album.tracksCount).toEqual(album.tracks.length);
  });
});

describe('Album get release year virual property', () => {
  it('should return year of the album', async () => {
    const album = new Album({ tracks: ['track1, track2'] });
    expect(album.year).toEqual(new Date().getFullYear());
  });
});
