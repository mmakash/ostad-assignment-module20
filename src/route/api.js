const express = require('express');
const router = express.Router();
const SaleController = require('../controller/SaleController');

router.post('/sale', SaleController.createSale);
router.get('/api/sales/total-revenue', SaleController.getTotalSale);

module.exports = router;