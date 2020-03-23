const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const path = require('path');
const uploader = require('../utils/uploader');
const router = express.Router();

router.post(
  '/categories',
  authController.protect,
  uploader.array('icons', 12),
  browseController.createCategory
);

router.get(
  '/categories',
  authController.protect,
  browseController.getCategories
);

router.get(
  '/categories/:id',
  authController.protect,
  browseController.getCategory
);

router.get(
  '/categories/:id/playlists',
  authController.protect,
  browseController.getCategoriesPlaylists
);

router.get(
  '/featured-playlists',
  authController.protect,
  browseController.getCategoriesPlaylists
);

router.get(
  '/new-releases',
  authController.protect,
  browseController.getNewRelease
);

module.exports = router;
