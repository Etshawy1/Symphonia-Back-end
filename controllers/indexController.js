const path = require('path');
module.exports = (req, res, next) => {
  __logger.error('adssafdsafsd;');
  res.sendFile(path.join(__dirname, '../views/testSockets.html'));
};
