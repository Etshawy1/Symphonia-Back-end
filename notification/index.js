// const functions = require('firebase-functions');
// const _ = require('lodash');
// const User = require('./models/userModel');

// const firebaseConfig = {
//     apiKey: "AIzaSyBc9eQpKYi7CuXkIXOa0oMLpVCeObjiJqQ",
//     authDomain: "symphonia-44ba7.firebaseapp.com",
//     databaseURL: "https://symphonia-44ba7.firebaseio.com",
//     projectId: "symphonia-44ba7",
//     storageBucket: "symphonia-44ba7.appspot.com",
//     messagingSenderId: "127101148812",
//     appId: "1:127101148812:web:325324d331e46deefc65a9",
//     measurementId: "G-SLSGQNP2T8"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// const functions = require('firebase-functions');

// // The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();
// var db = admin.database();

// var ref = db.ref("server");
// exports.func = functions.database.ref('/announcements/{pushId}')
//     .onCreate((snapshot, context) => {
//         const newPost = snapshot.val();

//         const payload = {
//             notification: {
//                 title: newPost.notyTitle,
//                 body: newPost.notyBody

//             },
//             data: {
//                 title: newPost.title,
//                 body: newPost.body,
//                 time: newPost.time,
//                 place: newPost.place,
//                 deadline: newPost.deadline,
//                 topic: newPost.topic,
//                 img: newPost.ImgUrl

//             }
//         };

//         const topic = newPost.topic;

//         admin.messaging().sendToTopic(topic, payload)
//             .then(function (response) {
//                 console.log("Successfully sent message:", response);
//             })
//             .catch(function (error) {
//                 console.log("Error sending message:", error);
//             });

//     });

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     if (req.query.auth === "mamma mia") {
//         const newUser = await User.create(
//             _.pick(req.query, ['email', 'password', 'name', 'passwordConfirm'])
//         );
//         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//         res.redirect(303, newUser.toString());
//     }
// });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     consle.log("Hello!");
//     response.send("Hello from Firebase!");
// });
