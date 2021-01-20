const path = require('path');
const rootDir = require('../util/path');

const Product = require('../models/product');

exports.postAddProductTurbo = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views/html', 'teste.html'));
};

exports.getProducts = (req, res, next) => {
    //console.log('shop page', adminData.products);
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders'
    });
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Your checkout'
    });
};