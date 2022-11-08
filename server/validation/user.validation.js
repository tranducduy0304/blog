const Joi = require('joi');
const userConst = require('../const/user.const');
const errMessage = require ('../const/err-messages.const');

const validationDataInput = {
    username: Joi.string()
        .min(6)
        //.regex(userConst.USERNAME_REGEX)
        .regex(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({ 
            'string.pattern.base': errMessage.INVALID_USERNAME,
            'string.min': `"username" must have at least 8 characters`
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PASSWORD }),

    full_name: Joi.string()
        .trim()
        .regex(userConst.FULLNAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_FULLNAME }),

    email: Joi.string()
        .trim()
        .regex(userConst.EMAIL_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_EMAIL }),

    phone_number: Joi.string()
        .trim()
        .regex(userConst.PHONE_NUMBER_REGEX)
        .required()
        .messages({ 'string.pattern.base': "Phone number is not valid!" }),

    country: Joi.string()
        .trim()
        .required()
        .messages({ 'string.parttern.base': errMessage.INVALID_COUNTRY }),

    dob: Joi.date()
        .max('01-01-2004')
        .iso()
        .required()
        .messages({
            'date.format': errMessage.INVALID_FORMAT_BIRTHDAY,

    }),
}

module.exports = {
    createValidation: {
        body: Joi.object(validationDataInput),
    },
}

// module.exports = validationDataInput;
