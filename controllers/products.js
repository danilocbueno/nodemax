const path = require('path');
const rootDir = require('../util/path');

const products = [];

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.postAddProductTurbo = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views/html', 'teste.html'));
};

exports.getProduct = (req, res, next) => {
    //console.log('shop page', adminData.products);
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};