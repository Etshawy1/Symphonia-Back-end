const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');
const meController = require('../controllers/meController');

const router = express.Router();

router.get('/player/tracks/:artist_id/:track_id', meController.playTrack);

//thsi just for testing the player
router.get('/gamed', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

module.exports = router;