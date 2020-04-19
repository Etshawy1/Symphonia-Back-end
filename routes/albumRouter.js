const express = require('express');
const albumController = require('./../controllers/albumController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', albumController.getManyAlbums);
router.get('/:id', albumController.getAlbum);
router.get('/:id/tracks', albumController.getAlbumTracks);
router.post('/', authController.protect(true), albumController.createAlbum);
module.exports = router;
