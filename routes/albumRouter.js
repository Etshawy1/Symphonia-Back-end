const express = require('express');
const albumController = require('./../controllers/albumController');
const trackController = require('../controllers/trackController');
const authController = require('../controllers/authController');
const searchHistory = require('../utils/searchMiddleware');
const router = express.Router();

router.get('/', albumController.getManyAlbums);
router.get('/:id', albumController.getAlbum);
router.get(
  '/:id/tracks',
  authController.protect(false),
  searchHistory.saveSearchHistory,
  albumController.getAlbumTracks
);

router.post(
  '/',
  authController.protect(true),
  authController.restrictTo('artist'),
  albumController.multiPart,
  albumController.resizeImage,
  albumController.createAlbum
);

router.delete(
  '/:id',
  authController.protect(true),
  authController.restrictTo('artist'),
  albumController.checkCurrentArtist,
  albumController.deleteAlbum
);

router.delete(
  '/:id/tracks/:trackId',
  authController.protect(true),
  authController.restrictTo('artist'),
  albumController.checkCurrentArtist,
  trackController.deleteAlbumTrack
);

router.patch(
  '/:id',
  authController.protect(true),
  authController.restrictTo('artist'),
  albumController.checkCurrentArtist,
  albumController.renameAlbum
);
router.patch(
  '/:id/tracks/:trackId',
  authController.protect(true),
  authController.restrictTo('artist'),
  albumController.checkCurrentArtist,
  trackController.renameAlbumTrack
);
module.exports = router;
