const mongoose = require('mongoose');

module.exports = function () {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      __logger.info('DB connection successful!');
    })
    .catch(err => {
      __logger.error(err.message);
      const DBLocal = process.env.DATABASE_LOCAL;
      mongoose
        .connect(DBLocal, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        })
        .then(() => {
          __logger.info('DB connection successful! local');
        })
        .catch(er => {
          __logger.error(er.message);
          process.exit(); /* an agresive why to stop the pplication */
        });
    });
};
