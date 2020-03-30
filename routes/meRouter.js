const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');
const meController = require('../controllers/meController');

// const authController = require('../controllers/authController');
const followController = require('../controllers/followController');
const libraryController = require('../controllers/libraryController');

const playlistController = require('./../controllers/playlistController');

const router = express.Router();
router.get('/player/tracks/:track_id', meController.playTrack);

router.use(authController.protect);
router.get('/top/:type', meController.topTracksAndArtists);
router.get('/recently-played', meController.recentlyPlayed);
// your queue is your current context
router.patch('/player/shuffle', meController.shuffle);
router.patch('/player/volume', meController.volume);
router.patch('/player/repeat', meController.repeat);
router.patch('/player/repeatOnce', meController.repeatOnce);
router.patch('/player/seek', meController.seek);
router.patch('/player/devices', meController.pushDevices);
router.post('/player/previous', meController.previous);
router.post('/player/next', meController.next);
router.post('/player/queue', meController.pushQueue);
router.delete('/player/queue', meController.popQueue);
router.delete('/player/devices', meController.popDevices);
router.get('/player/devices', meController.getDevices);
router.get('/player/currently-playing', meController.getCurrentlyPlaying);
router.get('/player/queue', meController.getQueue);

//router.batch('/v1/me/player/play',);
// don't change anyline of my code again there is no problem to put these routes here if there is a problem with you it must be from your work not from the postion of my routes
router.get('/', meController.currentUserProfile);
router.get('/:user_id', meController.userProfile);

// section: follow routes
// Description: check if the current user follows a another user(partist or normal user)
router.get('/following/contains', followController.checkIfUserFollower);

// Description: follow an artist or user
router.put('/following', followController.FollowUser);

// Description: get a user's followed artists
router.get('/following', followController.getUserFollowedArtists);

//Description: unfollow artist or users
router.delete('/following', followController.unfollowUser);

//section: library routes

// Description: Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
router.get('/albums/contains', libraryController.checkUserSavedAlbums);

//Description: Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
router.get('/tracks/contains', libraryController.checkUserSavedTracks);

//Description: Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
router.get('/albums', libraryController.getCurrentUserSavedAlbums);

//Description: Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
router.get('/tracks', libraryController.getCurrentUserSavedTracks);

//Description:Remove one or more albums from the current user’s ‘Your Music’ library.
router.delete('/albums', libraryController.getCurrentUserSavedTracks);

//Description:Remove one or more tracks from the current user’s ‘Your Music’ library.
router.delete('/tracks', libraryController.removeCurrentUserSavedTracks);

//Description: Save one or more albums to the current user’s ‘Your Music’ library.
router.put('/albums', libraryController.saveCurrentUserAlbums);
//Description:Save one or more tracks to the current user’s ‘Your Music’ library.
router.put('/tracks', libraryController.saveCurrentUserTracks);

//section: Playlist routes

//Description: Get a list of the playlists owned or followed by the current Symphonia user.
router.get('/playlists', playlistController.getCurrentUserPlaylists);

module.exports = router;
