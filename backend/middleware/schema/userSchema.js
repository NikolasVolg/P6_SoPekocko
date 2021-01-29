const Joi = require('joi');

const joiSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),

    password: Joi.string()
        .alphanum()
        .min(6)
        .max(16)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,16}$'))
});

module.exports = joiSchema;