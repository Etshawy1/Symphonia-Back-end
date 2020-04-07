const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const path = require('path');
const UploadBuilder = require('../utils/uploader').UploadBuilder;
const router = express.Router();

// summary: gets the list of available categories in the database
router.get('/categories', browseController.getCategories);

router.get('/new-releases', browseController.getNewRelease);

router.get('/categories/:id', browseController.getCategory);

router.get(
  '/categories/:id/playlists',
  browseController.getCategoriesPlaylists
);

router.get('/featured-playlists', browseController.getCategoriesPlaylists);

router.get('/artists', browseController.getArtists);

router.use(authController.protect);
// TODO: solve the problem of disappearing fields
let uploadBuilder = new UploadBuilder();
// this means to name the file in icon field with name in the req.body
uploadBuilder.addfileField('icon', 'name', '', 1);
//uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
uploadBuilder.addTypeFilter('image/jpeg');
uploadBuilder.addTypeFilter('image/png');
uploadBuilder.setPath(
  path.resolve(__dirname, '..') + '/assets/images/categories'
);
//let f_uploader = uploader.fields([{ name: 'icon', maxCount: 1 }]);
let f_uploader = uploadBuilder.constructUploader();
router.post('/categories', f_uploader, browseController.createCategory);

/*
router.post(
  '/categories',
  authController.protect,
  browseController.createCategory
);*/

module.exports = router;
