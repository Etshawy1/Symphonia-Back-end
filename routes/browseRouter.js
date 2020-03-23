const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const path = require('path');
const multer = require('multer');
const imagePath = path.resolve(__dirname, '..') + '/assets/images/categories';
const appError = require('../utils/appError');
const imagePath1 = 'soso/';

const fileFilter = (req, file, next) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    next(null, true);
  } else {
    next(new appError("error file type is n't allowed", 400), false);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imagePath);
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const router = express.Router();

router.post(
  '/categories',
  authController.protect,
  upload.array('icons', 12),
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
