const Joi = require('joi');

const sauceSchema = Joi.object({
    name: Joi.string()
        .required(),


    manufacturer: Joi.string()
        .required(),
    mainPepper: Joi.string()
        .required(),


    description: Joi.string()
        .required(),


    heat: Joi.number()

});

module.exports = sauceSchema;