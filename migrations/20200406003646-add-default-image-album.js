module.exports = {
  async up (db, client) {
    await db.collection('albums').update(
      {},
      {
        $set: {
          image: 'http://zasymphonia.ddns.net/api/v1/images/albums/default.png'
        }
      },
      {
        upsert: false,
        multi: true
      }
    );
  },

  async down (db, client) {
    await db.collection('albums').update(
      {},
      { $set: { image: '' } },
      {
        upsert: false,
        multi: true
      }
    );
  }
};
