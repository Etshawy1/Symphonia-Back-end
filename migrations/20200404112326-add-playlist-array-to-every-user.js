module.exports = {
  async up (db, client) {
    await db.collection('users').update(
      {},
      { $set: { playlists: [] } },
      {
        upsert: false,
        multi: true
      }
    );
  },

  async down (db, client) {
    await db.collection('users').update(
      {},
      { $unset: { playlists: 1 } },
      {
        upsert: false,
        multi: true
      }
    );
  }
};
