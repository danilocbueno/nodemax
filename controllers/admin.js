const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageURL, description, price);
    
    product.save();
    return res.redirect('/');
    //res.render("admin/add-product");
    //res.send("ola");
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect("/");
    }

    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) return res.redirect("/");
        console.log(editMode);
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })

};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageURL = req.body.imageURL;
    const updatedDesc = req.body.description;
    const updatedProduct =  new Product(prodId, updatedTitle, updatedImageURL, updatedDesc, updatedPrice);

    console.log(updatedProduct);

    updatedProduct.save();
    res.redirect("/admin/products");
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};