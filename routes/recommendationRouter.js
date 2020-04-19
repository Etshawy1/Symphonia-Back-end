const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const recommendationController = require('../controllers/recommendationController');
const path = require('path');
const router = express.Router();

router.use(authController.protect(true));
router.get(
  '/available-genre-seeds',
  recommendationController.getAvailabeGenreSeed
);
router.get('/', recommendationController.getRecommendedTracks);

module.exports = router;
