const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/checkout', orderController.processCheckout);
router.get('/:orderNumber', orderController.getOrderDetails);

module.exports = router;