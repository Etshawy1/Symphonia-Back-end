const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/auth/google', passport.authenticate('google', {
  "session": false
}, {
  scope: ['profile', 'https://www.googleapis.com/auth/user.emails.read', 'https://www.googleapis.com/auth/user.phonenumbers.read']
}));
router.get('/auth/google/Symphonia', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});
router.get('/auth/facebook', passport.authenticate('facebook', {
  "session": false
}, {
  scope: ['email']
}));
//http://localhost:3000/api/v1/users/auth/facebook/Symphonia
router.get('/auth/facebook/Symphonia',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/'
  }), (req, res) => {
    res.status(200).json({
      success: true,
      message: 'OAuth is now active'
    });
  });
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