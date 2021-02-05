const express = require('express');
const authController = require('../controllers/authController');

const { celebrate, CelebrateError } = require('celebrate');
const router = express.Router();
const Joi = require('joi')


const validate = require('../middleware/validation');
//const createUserSchema = require('../models/schemas/userSchema');\

const createUserSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(7).alphanum()
});

router.get('/login', authController.getLogin);
router.post('/login', validate(createUserSchema), authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', validate(createUserSchema), authController.postSignup);

module.exports = router;