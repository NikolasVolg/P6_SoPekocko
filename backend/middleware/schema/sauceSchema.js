const Joi = require('joi');

const sauceSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(24),

    manufacturer: Joi.string()
        .min(3)
        .max(36),

    description: Joi.string()
        .min(3)
        .max(350),

    mainPepper: Joi.string()
        .min(3)
        .max(250),

    heat: Joi.number(),

    userId: Joi.string()

});

module.exports = sauceSchema;