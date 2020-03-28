const express = require('express');
// const authController = require('../controllers/authController');
const followController = require('../controllers/followController');

const router = express.Router();

// section: follow routes
// check if user follows a playlist
router.get('/:id/followers/contains', followController.checkIfPlaylistFollower);
// Description: follow a playlist
router.put('/:id/followers', followController.followPlaylist);
// Description: un follow a playlist
router.delete('/:id/followers', followController.unfollowPlaylist);

module.exports = router;
