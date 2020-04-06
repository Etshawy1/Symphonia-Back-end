const express = require('express');
const authController = require('../controllers/authController');
const meController = require('../controllers/meController');
const followController = require('../controllers/followController');
const libraryController = require('../controllers/libraryController');
const playlistController = require('./../controllers/playlistController');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(authController.protect);
// don't change anyline of my code again there is no problem to put these routes here if there is a problem with you it must be from your work not from the postion of my routes

//save shuffle
router.patch('/player/shuffle', meController.shuffle);
//save volume
router.patch('/player/volume', meController.volume);
//save repeat
router.patch('/player/repeat', meController.repeat);
//save repeatOnce
router.patch('/player/repeatOnce', meController.repeatOnce);
//save seek
router.patch('/player/seek', meController.seek);
//save devices
router.patch('/player/devices', meController.pushDevices);
//go to previous track
router.post('/player/previous', meController.previous);
//go to next track
router.post('/player/next', meController.next);
//add to queue
router.post('/player/queue', meController.pushQueue);
//delete from queue
router.delete('/player/queue', meController.popQueue);
//delete device
router.delete('/player/devices', meController.popDevices);
//get devices
router.get('/player/devices', meController.getDevices);
//get currently playing
router.get('/player/currently-playing', meController.getCurrentlyPlaying);
//get queue
router.get('/player/queue', meController.getQueue);
//play the track
router.get(
  '/player/tracks/:track_id',
  bodyParser.raw({ type: 'application/json' }),
  meController.playTrack
);
//get top artist and top tracks
router.get('/top/:type', meController.topTracksAndArtists);
//get recent tracks
router.get('/recently-played', meController.recentlyPlayed);
//get user privte profile
router.get('/', meController.currentUserProfile);
router.put('/', meController.updateCurrentUserProfile);

//router.batch('/v1/me/player/play',);
//premium with creditcard
router.get('/checkout-session', meController.getCheckoutSession);
router.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  meController.webhookCheckout
);

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

//get public profile
// hint: moved the end of file to avoid confusion /name routes like /following /playlists
// albums
router.get('/:user_id', meController.userProfile);

module.exports = router;
