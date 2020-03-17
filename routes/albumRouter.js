const express = require('express');
const albumController = require('./../controllers/albumController');

const router = express.Router();

router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbum);
router.get('/:id/tracks', albumController.getAlbumTracks);
router.post('/', albumController.createAlbum);
module.exports = router;
