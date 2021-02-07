const express = require('express');
const adminController = require('../controllers/adminController');
const { isAuth } = require('../middleware/is-auth');

const router = express.Router();

router.post('/add-product', 
    //isAuth, 
    adminController.uploadProductPhoto, 
    adminController.resizeProductPhoto,
    adminController.postAddProduct);

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;
