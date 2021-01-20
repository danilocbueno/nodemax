const fs = require('fs');
const path = require('path');

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
    constructor(title, imageURL, description, price) {
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
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