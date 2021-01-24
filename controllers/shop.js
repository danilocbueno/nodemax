const path = require('path');
const rootDir = require('../util/path');

const Product = require('../models/product');
const Cart = require('../models/cart');

// /products
exports.getProducts = async (req, res, next) => {

    try {
        const products = await Product.findAll({ raw: true });
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    } catch (err) {
        next(err);
    }
};

// /
exports.getIndex = async (req, res, next) => {

    //const products = await Product.findAll({raw: true});
    //console.log("All products:", JSON.stringify(products, null, 2));
    //console.log(products);


    Product.findAll({ raw: true })
        .then(prodcuts => {
            console.log(prodcuts);
            res.render('shop/index', {
                prods: prodcuts,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId, { raw: true })
        .then(product => {
            console.log(product);
            res.render('shop/product-detail', { product: product });
        })
        .catch(err => console.log(err));

};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        })
    })
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (prod) => {
        Cart.addProduct(prod.id, prod.price);
    })
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    })
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