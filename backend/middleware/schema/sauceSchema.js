const Joi = require('joi');

const sauceSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(24),
    manufacturer: Joi.string()
        .min(3)
        .max(24),
    description: Joi.string()
        .min(3)
        .max(250),
    mainPepper: Joi.string()
        .min(3)
        .max(350)

});

module.exports = sauceSchema;