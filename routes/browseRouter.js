const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const path = require('path');
const UploadBuilder = require('../utils/uploader').UploadBuilder;
const searchHistory = require('../utils/searchMiddleware');
const router = express.Router();

// summary: gets the list of available categories in the database
router.get('/categories', browseController.getCategories);

router.get('/new-releases', browseController.getNewRelease);

router.get('/categories/:id', browseController.getCategory);

router.get(
  '/categories/:id/playlists',
  authController.protect(false),
  searchHistory.saveSearchHistory,
  browseController.getCategoriesPlaylists
);

router.get('/featured-playlists/:id', browseController.getCategoriesPlaylists);
router.use(authController.protect(true));
router.get('/artists', browseController.getRecommendedArtists);
let uploadBuilder = new UploadBuilder();
// this means to name the file in icon field with name in the req.body
uploadBuilder.addfileField('icon');
uploadBuilder.addTypeFilter('image/jpeg');
uploadBuilder.addTypeFilter('image/png');
uploadBuilder.setPath(
  path.resolve(__dirname, '..') + '/assets/images/categories'
);
let f_uploader = uploadBuilder.constructUploader(false);
router.post('/categories', f_uploader, browseController.createCategory);


module.exports = router;
