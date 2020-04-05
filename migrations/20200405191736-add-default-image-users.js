module.exports = {
  async up (db, client) {
    await db.collection('users').update(
      {},
      {
        $set: {
          imageUrl:
            'ec2-52-21-160-186.compute-1.amazonaws.com/api/v1/users/images/default.png'
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
