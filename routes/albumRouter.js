const express = require('express');
const albumController = require('./../controllers/albumController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', albumController.getManyAlbums);
router.get('/:id', albumController.getAlbum);
router.get('/:id/tracks', albumController.getAlbumTracks);
router.post(
  '/',
  albumController.multiPart,
  authController.protect(true),
  authController.restrictTo('artist'),
  albumController.createAlbum
);
module.exports = router;
