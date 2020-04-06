module.exports = {
  async up (db, client) {
    await db.collection('users').update(
      {},
      {
        $set: {
          imageUrl:
            'http://zasymphonia.ddns.net/api/v1/images/users/default.png'
        }
      },
      {
        upsert: false,
        multi: true
      }
    );
  },

  async down (db, client) {
    await db.collection('users').update(
      {},
      { $unset: { imageUrl: 1 } },
      {
        upsert: false,
        multi: true
      }
    );
  }
};
