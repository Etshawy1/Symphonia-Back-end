const express = require('express');
// const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');

const router = express.Router();
router.get('/categories', browseController.getCategories);

router.get('/categories/:id', browseController.getCategory);

router.get(
  '/categories/:id/playlists',
  browseController.getCategoriesPlaylists
);

router.get('/featured-playlists', browseController.getCategoriesPlaylists);

router.get('/new-releases', browseController.getNewRelease);

module.exports = router;
