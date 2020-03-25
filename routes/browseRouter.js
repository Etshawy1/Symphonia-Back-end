const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const path = require('path');
const uploader = require('../utils/uploader');
const router = express.Router();

router.post(
  '/categories',
  authController.protect,
  uploader.fields([
    { name: 'icon_sm', maxCount: 1 },
    { name: 'icon_md', maxCount: 1 },
    {
      name: 'icon_lg',
      maxCount: 1
    }
  ]),
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
