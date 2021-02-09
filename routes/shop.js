const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);


router.get('/calendar/:productId', shopController.getCalendar);
router.post('/calendar', shopController.postCalendar);

router.get('/orders', shopController.getOrders);

router.get('/checkout/:orderId', shopController.getCheckout);
router.post('/checkout/', shopController.postCheckout);

router.get('/checkout/success', shopController.getOrders);
router.get('/checkout/cancel', shopController.getCheckout);

module.exports = router;