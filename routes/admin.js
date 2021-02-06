const express = require('express');
const adminController = require('../controllers/adminController');
const { isAuth } = require('../middleware/is-auth');

const router = express.Router();

router.post('/add-product', 
    isAuth, 
    adminController.uploadProductPhoto, 
    adminController.resizeProductPhoto,
    adminController.postAddProduct);

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.deleteProduct);

module.exports = router;
