const path = require('path');
const rootDir = require('../util/path');

const Category = require('../models/category');


//READ
exports.fecthAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll({ raw: true });
        return res.render('category/list', { categories: categories });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.fetchOne = async (req, res, next) => {
};


//CREATE
exports.new = (req, res, next) => {
    res.render('category/form', { category: { title: null }, _csrfToken: req.csrfToken() });
};

exports.store = async (req, res, next) => {
    const { title } = req.fields;
    const category = await Category.create({ title: title });
    req.flash('msg', 'Category added!');
    res.redirect(303, '/categories');
};

//DELETE
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Category.destroy({ where: { id: id } });
        req.flash('msg', 'Category deleted!');
        return res.redirect(303, '/categories');
    } catch (error) {
        return res.status(500).send(error.message);
    }

};

//UPDATE
exports.edit = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id);
        return res.render('category/form', { category: category });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.put = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title } = req.fields;
        console.log(title);
        await Category.update({ title: title }, {
            where: { id: id }
        });
        return res.redirect(303, '/categories');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.turbo = () => {
    /*
esse funciona com o turbo links

res.setHeader('content-type', 'text/vnd.turbo-stream.html');
res.end(`<turbo-stream action="replace" id="stream" target="new_message">
            <template>
            <h3 id="mutandis">Turbo Stream to the rescue!</h3>
            </template>
        </turbo-stream>`);
//res.sendFile(path.join(rootDir, 'views/category', 'turbo-response.html'));
*/
}