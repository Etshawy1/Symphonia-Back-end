const express = require('express');
const indexRouter = require('../routes/index');
const userRouter = require('../routes/userRouter');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

module.exports = function (app) {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false
    })
  );

  app.use('/', indexRouter);
  app.use('/api/v1/users', userRouter);

  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  app.use(globalErrorHandler);
};
