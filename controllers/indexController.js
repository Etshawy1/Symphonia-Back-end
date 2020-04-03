const path = require('path');
const io = require('socket.io')(80);
module.exports = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/testSockets.html'));
};
