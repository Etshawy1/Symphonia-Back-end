const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  items: [
    {
      data: {
        data: String
      },
      notification: {
        title: String,
        body: String,
        sounds: String,
        icon: String
      },
      date: Date
    }
  ]
});
const Notification = mongoose.model('Notification', notificationSchema);
exports.Notification = Notification;
