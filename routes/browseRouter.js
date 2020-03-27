const express = require('express');
const authController = require('../controllers/authController');
const browseController = require('../controllers/browseController');
const path = require('path');
const UploadBuilder = require('../utils/uploader').UploadBuilder;
const router = express.Router();

try {
  /*
  let uploadBuilder = new UploadBuilder();
  uploadBuilder.addfileField('icon', 'name', '', 1);
  uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
  uploadBuilder.addTypeFilter('image/jpeg');
  uploadBuilder.setPath(
    path.resolve(__dirname, '..') + '/assets/images/categories'
  );
  //let f_uploader = uploader.fields([{ name: 'icon', maxCount: 1 }]);
  let f_uploader = uploadBuilder.constructUploaderTemp();
  router.post(
    '/categories',
    authController.protect,
    f_uploader,
    browseController.createCategory
  );
  */
} catch (error) {
  console.log(error);
}
router.post(
  '/categories',
  authController.protect,
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
