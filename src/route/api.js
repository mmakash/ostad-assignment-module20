const express = require('express');
const router = express.Router();
const SaleController = require('../controller/SaleController');

router.post('/sale', SaleController.createSale);
router.get('/api/sales/total-revenue', SaleController.getTotalSale);
router.get('/api/sales/quantity-by-product', SaleController.totalQuantityByProduct);
router.get('/api/sales/top-products', SaleController.topProducts);
router.get('/api/sales/average-price', SaleController.averageProductPrice);
router.get('/api/sales/revenue-by-month', SaleController.RevenueByMonth);
router.get('/api/sales/highest-quantity-sold', SaleController.HighestQuantitySold);
router.get('/api/sales/department-salary-expense', SaleController.DepartmentSalaryExpenses);

module.exports = router;