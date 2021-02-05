const express = require('express');
const categoryController = require('../controllers/categoryController');
const { isAuth, restrictTo } = require('../middleware/is-auth');

const router = express.Router();

//READ
router.get('/categories', categoryController.fecthAll);
router.get('/categories/:id');

//CREATE
router.get('/categories/new', isAuth, categoryController.new);
router.post('/categories', isAuth, categoryController.store);

//UPDATE
router.put('/categories/:id', isAuth, categoryController.put);
router.get('/categories/:id/edit', isAuth, categoryController.edit);

//DELETE
router.delete('/categories/:id', isAuth, restrictTo('admin'), categoryController.delete);

module.exports = router;