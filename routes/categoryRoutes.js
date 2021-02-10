const express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuth, restrictTo } = require('../middleware/is-auth');

const router = express.Router();

//READ
router.get('/categories', categoryController.fecthAll);
router.get('/categories/:id');

//CREATE
router.get('/categories/new', categoryController.new);
router.post('/categories', categoryController.store);

//UPDATE
router.put('/categories/:id', categoryController.put);
router.get('/categories/:id/edit', categoryController.edit);

//DELETE
router.delete('/categories/:id',
    //restrictTo('admin'), 
    categoryController.delete);

module.exports = router;