const express = require('express');
const helmet = require('helmet');
const indexRouter = require('../routes/index');

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(helmet());
  app.use('/', indexRouter);
};