const express = require('express');
const indexRouter = require('../routes/index');
const userRouter = require('../routes/userRouter');
const meRouter = require('../routes/meRouter');
const albumRouter = require('../routes/albumRouter');
const browseRouter = require('../routes/browseRouter');
// const browseRouter = require('../routes/browseRouter');
// const playlistsRouter = require('../routes/playlistsRouter');
const playlistRouter = require('./../routes/playlistRouter');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

module.exports = function(app) {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false
    })
  );

  app.use('/', indexRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/me', meRouter);
  app.use('/api/v1/albums', albumRouter);
  app.use('/api/v1/browse', browseRouter);
  app.use('/api/v1/playlists', playlistRouter);

  // serve static
  app.use(
    '/api/v1/browse/categories/images',
    express.static('assets/images/categories')
  );

  // app.use('/api/v1/browse', browseRouter);
  // app.use('api/v1/me', me1Router);
  // app.use('/api/v1/playlists', playlistsRouter);

  // app.use('/v1', v1Router);
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
};
