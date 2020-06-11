const express = require('express');
const authController = require('../controllers/authController'); 
const followController = require('../controllers_v2/followController');

const router = express.Router();
router.use(authController.protect(true));

// Description: get a user's followed artists
router.get('/following', followController.getUserFollowedArtists);

module.exports = router