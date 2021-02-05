const Joi = require('joi')

const createUserSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(7).alphanum()
})

module.exports = {
    createUserSchema
}