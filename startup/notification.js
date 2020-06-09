const admin = require('firebase-admin');
const serviceAccount = require('./../symphonia.json');
const { Notification } = require('../models/notificationsModel');
const { User } = require('../models/userModel');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://symphonia-272211.firebaseio.com'
});

exports.notify = async (users, ownerId, title, body, icon) => {
  for (let index = 0; index < users.length; index++) {
    const user = await User.findById(users[index]).select('+notification');
    const payload = {
      data: {
        data: JSON.stringify({
          from: ownerId,
          to: user._id
        })
      },
      notification: {
        title: title,
        body: body,
        sounds: 'default',
        icon: icon
      }
    };
    if (user.notification == undefined) {
      //payload.date = Date.now();
      const notification = await Notification.create({
        items: [payload]
      });
      //payload.date = undefined;
      user.notification = notification._id;
    } else {
      const notification = await Notification.findById(user.notification);
      //payload.date = Date.now();
      notification.items.push(payload);
      //payload.date = undefined;
      await notification.save({ validateBeforeSave: false });
    }
    if (user.registraionToken)
      await admin.messaging().sendToDevice(user.registraionToken, payload);
    await user.save({ validateBeforeSave: false });
  }
};
