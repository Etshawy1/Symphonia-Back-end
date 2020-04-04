const path = require('path');
const io = require('socket.io')(80);
module.exports = (req, res, next) => {
  __logger.error('adssafdsafsd;');
  res.sendFile(path.join(__dirname, '../views/testSockets.html'));
};
