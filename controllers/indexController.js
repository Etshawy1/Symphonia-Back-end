const path = require('path');
const io = require('socket.io')(80);
module.exports = (req, res, next) => {
  if (io.sockets._events == undefined) {
    io.on('connection', socket => {
      socket.emit('welcome', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
  }

  res.sendFile(path.join(__dirname, '../views/testSockets.html'));
};
