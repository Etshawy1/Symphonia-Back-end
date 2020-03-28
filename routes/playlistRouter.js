const express = require('express');

const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');
const followController = require('../controllers/followController');

const router = express.Router();
router.use(authController.protect);
//Description: Get the current image associated with a specific playlist
router.get('/:id/images', playlistController.getPlaylistCoverImage);
// Description: Get a playlist owned by a Symphonia user
router.get('/:id', playlistController.getPlaylist);
// Description: Get full details of the tracks of a playlist owned by a Symphonia user
router.get('/:id/tracks', playlistController.getPlaylistTracks);
// Description: Remove one or more tracks from a user’s playlist
router.delete('/:id/tracks', playlistController.removePlaylistTracks);
// Description: Add one or more tracks to a user’s playlist
router.post('/:id/tracks', playlistController.addTracksToPlaylist);
// Description: Change a playlist’s name and public/private state. (The user must, of course, own the playlist.)
router.patch('/:id/', playlistController.changePlaylistDetails);
// Description: Replace all the tracks in a playlist, overwriting its existing tracks
//              This powerful request can be useful for replacing tracks, re-ordering existing tracks, or clearing the playlist.
router.patch('/:id/tracks', playlistController.replacePlaylistTracks);
// Description: Replace the image used to represent a specific playlist.
router.patch('/:id/images', playlistController.uploadCustomPlaylistCoverImage);

// section: follow routes

// check if user follows a playlist
router.get('/:id/followers/contains', followController.checkIfPlaylistFollower);
// Description: follow a playlist
router.put('/:id/followers', followController.followPlaylist);
// Description: un follow a playlist
router.delete('/:id/followers', followController.unfollowPlaylist);

module.exports = router;
