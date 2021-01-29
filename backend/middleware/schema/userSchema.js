const Joi = require('joi');

const joiSchema = Joi.object({
    email: Joi.string().email()
        .pattern(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)),

    password: Joi.string()
        .min(6)
        .max(16)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports = joiSchema;