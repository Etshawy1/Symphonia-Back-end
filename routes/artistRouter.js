const express = require('express');
const authController = require('../controllers/authController');
const artistController = require('./../controllers/artistController');

const router = express.Router();

router.get('/', artistController.getSeveralArtists);
router.get('/:id', artistController.getArtist);
router.get('/:id/related-artists', artistController.relatedArtists);
router.get('/:id/followers', artistController.ArtistFollowers);
module.exports = router;
