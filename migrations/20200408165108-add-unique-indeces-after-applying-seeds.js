module.exports = {
  async up (db, client) {
    db.collection('users').createIndex({ email: 1 }, { unique: true });
    db.collection('categories').createIndex({ id: 1 }, { unique: true });
    db.collection('categories').createIndex({ name: 1 }, { unique: true });
  },

  async down (db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
