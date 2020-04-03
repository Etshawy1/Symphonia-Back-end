const path = require('path');
module.exports = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/testSockets.html'));
};
