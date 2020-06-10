const express = require('express');
const indexRouter = require('../routes/index');
const userRouter = require('../routes/userRouter');
const meRouter = require('../routes/meRouter');
const albumRouter = require('../routes/albumRouter');
const browseRouter = require('../routes/browseRouter');
const recommendationRouter = require('../routes/recommendationRouter');
const artistRouter = require('../routes/artistRouter');
const searchRouter = require('../routes/searchRouter');
const playlistRouter = require('./../routes/playlistRouter');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');
const staticImages = require('../routes/images');
const bodyParser = require('body-parser');
const meRouter_v2 = require('../routes_v2/meRouter');
module.exports = function (app) {
  app.set('trust proxy', 'loopback'); // for deployment to get the host in the code
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
      limit: '50mb'
    })
  );
  // serve static
  app.use('/api/v1/images', staticImages);
  app.use(
    '/api/v1/browse/categories/images',
    express.static('assets/images/categories')
  );

  // rest of the routes
  app.use('/api/v1', indexRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/me', meRouter);
  app.use('/api/v1/albums', albumRouter);
  app.use('/api/v1/browse', browseRouter);
  app.use('/api/v1/playlists', playlistRouter);
  app.use('/api/v1/artists', artistRouter);
  app.use('/api/v1/search', searchRouter);
  app.use('/api/v1/recommendations', recommendationRouter);

  /* istanbul ignore next */
  // if any link is visited and not mentioned above will go to that next middleware
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
};
