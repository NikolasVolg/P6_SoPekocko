const Joi = require('joi');

const sauceSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(24)
        .pattern(new RegExp('^[a-zA-Z ]+$')),

    manufacturer: Joi.string()
        .min(3)
        .max(36)
        .pattern(new RegExp('^[a-zA-Z ]+$')),

    description: Joi.string()
        .min(3)
        .max(350)
        .pattern(new RegExp('^[a-zA-Z ]+$')),

    mainPepper: Joi.string()
        .min(3)
        .max(250)
        .pattern(new RegExp('^[a-zA-Z ]+$')),

    heat: Joi.number(),

    userId: Joi.string()

});

module.exports = sauceSchema;