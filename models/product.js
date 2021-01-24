const db = require('../util/database');
const Cart = require('../models/cart');

module.exports = class Product {
    constructor(id, title, imageURL, description, price) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, imageURL, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imageURL, this.description]);
    }

    static deleteById(id) {

    }

    static fetchAll(calbackFn) {
        return db.execute('SELECT * FROM products');
    }

    static findById(id, callbackFf) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
}