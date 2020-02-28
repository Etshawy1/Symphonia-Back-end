require('dotenv').config();
const express = require('express');

const app = express();
require('./startup/logging')(app);
require('./startup/ratelimit')(app);
require('./startup/routes')(app);
require('./startup/sanitization')(app);
require('./startup/db')();

module.exports = app;
