const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const Cart = require('../models/cart');

const p = path.join(
    path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = (calbackFn) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            calbackFn([]);
        } else {
            calbackFn(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageURL, description, price) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    save() {
        console.log(`esse: ${this}`);
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    if (err) return console.log(err);
                });
            } else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if (err) return console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }

    static fetchAll(calbackFn) {
        getProductsFromFile(calbackFn);
    }

    static findById(id, callbackFf) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callbackFf(product);
        });
    }
}