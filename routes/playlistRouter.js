const express = require('express');

const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');
const followController = require('../controllers/followController');

const router = express.Router();
router.get('/:id', playlistController.getPlaylist);
router.get('/:id/images', playlistController.getPlaylistCoverImage);
router.get('/:id/tracks', playlistController.getPlaylistTracks);
router.use(authController.protect);
router.delete('/:id/tracks', playlistController.removePlaylistTracks);
router.post('/:id/tracks', playlistController.addTracksToPlaylist);
router.patch('/:id/', playlistController.changePlaylistDetails);
router.patch('/:id/tracks', playlistController.replacePlaylistTracks);
router.patch('/:id/images', playlistController.uploadCustomPlaylistCoverImage);

// section: follow routes

router.get('/:id/followers/contains', followController.checkIfPlaylistFollower);
router.put('/:id/followers', followController.followPlaylist);
router.delete('/:id/followers', followController.unfollowPlaylist);

module.exports = router;
