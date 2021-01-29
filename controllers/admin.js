const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {

    const { title, imageUrl, price, description } = req.fields;
    // const title = req.body.title;
    // const imageURL = req.body.imageUrl;
    // const price = req.body.price;
    // const description = req.body.description;

    try {
        const result = req.user.createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        });

        res.redirect('/');

    } catch (err) {
        console.log(err);
    };
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }

    const prodId = req.params.productId;
    req.user.getProducts({ where: { id: prodId } })
        //Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if (!product) return res.redirect("/");

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        }).catch(err => console.log(err));

};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle,
                product.price = updatedPrice,
                product.description = updatedDesc,
                product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log("Updated product!");
            res.status(303).redirect("/admin/products");
        })
        .catch(err => console.log(err));


};


exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        //Product.findAll({ raw: true })
        .then(products => {

            console.log(products);

            res.render('admin/products', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findByPk(prodId)
        .then(product => {
            console.log(`product ${product}`);
            return product.destroy();
        })
        .then(result => {
            console.log("Destroy");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}