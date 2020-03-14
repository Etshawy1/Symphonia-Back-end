const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email', 'user_friends'],
  }));
router.get('/auth/facebook/Symphonia',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope: ['email', 'user_friends']
  }),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'OAuth is now active'
    });
  }
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/Symphonia',
  passport.authenticate('google', {
    failureRedirect: '/login',
    scope: ['profile', 'email']
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

router.patch(
  '/updatepassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/updateMe', authController.protect, userController.deleteMe);

module.exports = router;