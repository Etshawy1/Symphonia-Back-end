const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const playlistController = require('./../controllers/playlistController');
const trackController = require('./../controllers/trackController');
const searchHistory = require('../utils/searchMiddleware');

const router = express.Router();

router.post('/email-exist', authController.checkEmail);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch('/activate/:token', authController.activateArtist);

router.post(
  '/auth/facebook/Symphonia',
  passport.authenticate('facebookToken', {
    session: false,
    scope: ['profile', 'email']
  }),
  authController.facebookOauth
);

router.post(
  '/auth/google/Symphonia',
  passport.authenticate('googleToken', {
    session: false,
    scope: ['profile', 'email']
  }),
  authController.googleOauth
);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

// any endpoint written after the following line is protected
router.use(authController.protect(true));

router.patch('/updatepassword', authController.updatePassword);

// tracks

router
  .route('/track/:id')
  .get(
    authController.protect(false),
    searchHistory.saveSearchHistory,
    trackController.getTrack
  )
  .patch(
    authController.protect(true),
    authController.restrictTo('artist'),
    trackController.checkCurrentArtist,
    trackController.renameTrack
  )
  .delete(
    authController.protect(true),
    authController.restrictTo('artist'),
    trackController.checkCurrentArtist,
    trackController.deleteTrack
  );

router
  .route('/tracks')
  .get(trackController.getSeveralTacks)
  .post(
    authController.protect(true),
    authController.restrictTo('artist'),
    trackController.multiPart,
    trackController.addTrack
  );

// Playlist section

// Description: Get a list of the playlists owned or followed by a Symphonia user.
router.get('/:id/playlists', playlistController.getUserPlaylists);
// Description: Create a playlist for a Symphonia user. (The playlist will be empty until you add tracks.)
router.post('/:id/playlists', playlistController.createPlaylist);
router.patch('registrationtoken', userController.setToken);

module.exports = router;
