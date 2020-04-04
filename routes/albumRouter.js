const express = require('express');
const albumController = require('./../controllers/albumController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbum);
router.get('/:id/tracks', albumController.getAlbumTracks);
router.post('/', authController.protect, albumController.createAlbum);
module.exports = router;
