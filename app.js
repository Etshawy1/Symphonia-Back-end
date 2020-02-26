const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
require('./startup/routes')(app);
require('./middleware/error')(app);

// add those lines in your vscode settings.json
//  "files.insertFinalNewline": true,
//  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false
module.exports = app;
