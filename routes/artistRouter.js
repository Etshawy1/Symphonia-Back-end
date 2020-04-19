const express = require('express');
const authController = require('../controllers/authController');
const artistController = require('./../controllers/artistController');

const router = express.Router();

router.get('/', artistController.getSeveralArtists);
router.get('/:id', artistController.getArtist);
router.get('/:id/related-artists', artistController.relatedArtists);
router.get('/:id/albums', artistController.getArtistAlbums);
router.get('/:id/followers', artistController.artistFollowers);
router.get('/:id/top-tracks', artistController.artistTopTracks);
router.post(
  '/apply-artist',
  authController.protect(true),
  artistController.applyArtist
);
router.patch(
  '/apply-artist/:token',
  authController.protect(true),
  artistController.confirmApplication
);
module.exports = router;
