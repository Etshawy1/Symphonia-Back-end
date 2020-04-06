module.exports = {
  async up (db, client) {
    await db.collection('playlists').update(
      {},
      { $set: { images: [] } },
      {
        upsert: false,
        multi: true
      }
    );
    await db.collection('playlists').update(
      {},
      {
        $push: {
          images:
            'http://zasymphonia.ddns.net/api/v1/images/playlists/default.png'
        }
      },
      {
        upsert: false,
        multi: true
      }
    );
  },

  async down (db, client) {
    await db.collection('playlists').update(
      {},
      { $set: { images: [] } },
      {
        upsert: false,
        multi: true
      }
    );
  }
};
