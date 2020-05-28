const admin = require('firebase-admin');
const serviceAccount = require('./../symphonia.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://symphonia-272211.firebaseio.com'
});
