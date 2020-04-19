const express = require('express');
const authController = require('../controllers/authController');
const searchController = require('./../controllers/searchController');

const router = express.Router();
router.use(authController.protect(false));

router.get('/:keyword', searchController.searchGeneric);
router.get('/', searchController.searchType);

module.exports = router;
