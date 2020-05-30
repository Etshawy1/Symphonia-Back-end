const express = require('express');
const authController = require('../controllers/authController');
const meController = require('../controllers/meController');
const followController = require('../controllers/followController');
const libraryController = require('../controllers/libraryController');
const playlistController = require('./../controllers/playlistController');
const searchController = require('./../controllers/searchController');
const searchHistory = require('../utils/searchMiddleware');

const router = express.Router();
router.get('/player/tracks/:track_id/:token', meController.playTrack);
router.get(
  '/user/:id',
  authController.protect(false),
  searchHistory.saveSearchHistory,
  meController.userProfile
);
router.patch('/premium/:token', meController.premium);
router.post('/webhook-checkout', meController.webhookCheckout);
router.use(authController.protect(true));
//save shuffle
router.patch('/player/shuffle', meController.shuffle);
//save volume
router.patch('/player/volume', meController.volume);
// save repeat
router.patch('/player/repeat', meController.repeat);
// save repeatOnce
router.patch('/player/repeatOnce', meController.repeatOnce);
// save seek
router.patch('/player/seek', meController.seek);
// save devices
router.patch('/player/devices', meController.pushDevices);
// go to previous track
router.post('/player/previous', meController.previous);
// go to next track
router.post('/player/next', meController.next);
// add to queue
router.post('/player/queue', meController.pushQueue);
// delete from queue
router.delete('/player/queue', meController.popQueue);
// delete device
router.delete('/player/devices', meController.popDevices);
// get devices

router.get('/player/devices', meController.getDevices);
// get currently playing
router.get('/player/currently-playing', meController.getCurrentlyPlaying);
// get queue
router.get('/player/queue', meController.getQueue);
// play the track
router.post('/player/tracks/:track_id', meController.playInfo);
// get top artist and top tracks
router.get('/top/:type', meController.topTracksAndArtists);
// get recent tracks
router.get('/recently-played', meController.recentlyPlayed);
// get user privte profile
router.get('/', meController.currentUserProfile);
router.put('/', meController.updateCurrentUserProfile);

// router.batch('/v1/me/player/play',);

// section: follow routes
// Description: check if the current user follows a another user(partist or normal user)
router.get('/following/contains', followController.checkIfUserFollower);

router.get(
  '/following/playlists/count',
  followController.followedPlaylistCount
);

router.get('/following/playlists', followController.followedPlaylist);

// Description: follow an artist or user
router.put('/following', followController.FollowUser);

// Description: get a user's followed artists
router.get('/following', followController.getUserFollowedArtists);

// Description: unfollow artist or users
router.delete('/following', followController.unfollowUser);

// section: library routes

// Description: Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
router.get('/albums/contains', libraryController.checkUserSavedAlbums);

// Description: Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
router.get('/tracks/contains', libraryController.checkUserSavedTracks);

// Description: Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
router.get('/albums', libraryController.getCurrentUserSavedAlbums);

// Description: Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
router.get('/tracks', libraryController.getCurrentUserSavedTracks);

// Description:Remove one or more albums from the current user’s ‘Your Music’ library.
router.delete('/albums', libraryController.removeCurrentUserAlbums);

// Description:Remove one or more tracks from the current user’s ‘Your Music’ library.
router.delete('/tracks', libraryController.removeCurrentUserSavedTracks);

// Description: Save one or more albums to the current user’s ‘Your Music’ library.
router.put('/albums', libraryController.saveCurrentUserAlbums);
// Description:Save one or more tracks to the current user’s ‘Your Music’ library.
router.put('/tracks', libraryController.saveCurrentUserTracks);

// section: Playlist routes

router.get('/playlists', playlistController.getCurrentUserPlaylists);
router.get('/playlists/owned', playlistController.getCurrentUserOwnedPlaylists);
router.get(
  '/playlists/deleted',
  playlistController.getCurrentUserDeletedPlaylists
);
router.patch('/playlists/:id', playlistController.recoverCurrentUserPlaylists);
// section search history

router.get('/search/history', searchController.getSearchHistory);

// premium with creditcard
router.get('/checkout-session', meController.getCheckoutSession);

// registeration token notifications
router.patch('/registration-token', meController.setRegistrationToken);

// get the history of notifications
router.get('/notifications', meController.getNotificationsHistory);

// apply premium
router.post('/apply-premium', meController.applyPremium);

module.exports = router;
