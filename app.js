require('dotenv').config();
const express = require('express');

const app = express();
require('./startup/logging')();
app.use(require('morgan')('dev', { stream: __logger.stream }));
require('./startup/routes')(app);
require('./startup/db')();

module.exports = app;
