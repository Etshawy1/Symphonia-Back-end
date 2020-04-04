require('dotenv').config();
const path = require('path');
const express = require('express');
const compression = require('compression');
const passport = require('passport');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
app.use((req, res, next) => {
  res.io = io;
  next();
});
app.use(compression());
require('./startup/passport-setup');
require('./startup/logging')(app);
require('./startup/ratelimit')(app);
require('./startup/routes')(app);
require('./startup/sanitization')(app);
require('./startup/db')();
io.on('connection', socket => {
  __logger.info(`number of sockets open: ${io.engine.clientsCount}`);
  socket.on('connect', () => {
    __logger.info('Connection');
  });
  socket.on('disconnect', data => {
    __logger.info('disconnect');
  });
});

module.exports = { app, server };
