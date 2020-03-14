require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const passportSetUp = require('./startup/passport-setup');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
require('./startup/documentation')(app);
require('./startup/logging')(app);
require('./startup/ratelimit')(app);
require('./startup/routes')(app);
require('./startup/sanitization')(app);
require('./startup/db')();

module.exports = app;