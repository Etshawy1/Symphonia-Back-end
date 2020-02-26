const express = require('express');
const getIndex = require('../controllers/indexController');

const router = express.Router();

router.get('/', getIndex);

module.exports = router;
