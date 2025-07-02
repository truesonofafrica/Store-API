const express = require('express');
const router = express.Router();
const {
  getAllProductsStatics,
  getAllProducts,
} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatics);

module.exports = router;
