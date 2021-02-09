const path = require('path');
const rootDir = require('../util/path');

const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { ValidationError } = require('joi');
const session = require('express-session');

const stripe = require('stripe')('sk_test_51IGx4PGemRLi8D4AlOHA5pTKfRuni6o4GVHUdADW52hWUJwNQRydk9YYim0jj7XyEIQhOEHpFocxIGrdQ7JZiLhq00JM24hMqO');

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
    req.user.getCart()
        .then(cart => cart.getProducts())
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = async (req, res, next) => {
    const productId = req.body.productId;
    try {
        const cart = await req.user.getCart();
        const products = await cart.getProducts({ where: { id: productId } });
        if (products.length > 0) {
            product = products[0];
        }
        let newQuantity = 1;
        if (product) {
            //..
        }
        const product = await Product.findByPk(productId);
        cart.addProduct(product, { through: { quantity: newQuantity } });
        res.redirect('/cart');

    } catch (e) {
        console.log(e);
    }
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    })
};

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await req.user.getOrders({
            include: ['product', 'user'],
            raw: true,
            nest: true,
        });

        return res.render('shop/orders', { orders: orders });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


exports.getCheckout = async (req, res, next) => {

    try {

        const orderId = req.params.orderId;

        const order = await req.user.getOrders({
            include: ['product', 'user'],
            raw: true,
            nest: true,
            where: { id: orderId }
        });



        res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Your checkout',
            sessionId: stripeSession.id
        });

    } catch (err) {
        next(err);
    }

};

exports.postCheckout = (req, res, next) => {
    next();
}

exports.postOrder = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Your checkout'
    });
};

exports.getCalendar = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId, { raw: true });

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: product.title,
                description: product.description,
                amount: product.price,
                currency: 'BRL',
                quantity: '1'
            }],
            success_url: req.protocol + '://' + req.get('host') + '/checkout/success',
            cancel_url: req.protocol + '://' + req.get('host') + '/checkout/cancel',
        });

        if (product) {
            return res.render('shop/calendar', {
                product: product,
                sessionId: stripeSession.id
            });
        } else {
            throw new ValidationError('Product not found!');
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.postCalendar = async (req, res, next) => {
    try {
        const { date, time, productId } = req.body;

        const schedulingDate = new Date(`${date} ${time}`);

        const order = await req.user.createOrder({
            scheduling: schedulingDate,
            productId: productId
        });

        req.flash('msg', 'Order done!');
        res.redirect(303, `/checkout/${order.id}`);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    return next();
}