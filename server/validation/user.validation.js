const Joi = require('joi');
const errMessage = require ('../const/err-messages.const');

const validateDataInput = {
    username: Joi.string()
        .min(4)
        .regex(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({ 
            'string.pattern.base': errMessage.INVALID_USERNAME,
            'string.min': `"username" must have at least 6 characters`
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PASSWORD }),

    fullname: Joi.string()
        .trim()
        .regex(/^[a-z A-Z]+$/)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_FULLNAME }),

    email: Joi.string()
        .trim()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_EMAIL }),

    phone_number: Joi.string()
        .trim()
        .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PHONE }),

    country: Joi.string()
        .trim()
        .required()
        .messages({ 'string.parttern.base': errMessage.INVALID_COUNTRY }),
}

module.exports = {
    createValidation: {
        body: Joi.object(validateDataInput),
    },
}