const Joi = require('joi');

const profileSchema = Joi.object().keys({
    display_name: Joi.string().min(1).max(256).optional(),
    real_name: Joi.string().min(1).max(256).optional(),
    profile_picture: Joi.string().allow([null]).optional(),
    birthday: Joi.date().min(2002).optional(),
    gender: Joi.string().optional(),
    ethnicity: Joi.string().optional(),
    religion: Joi.string().optional(),
    figure: Joi.string().optional(),
    marital_status: Joi.string().optional(),
    occupation: Joi.string().min(0).max(256).optional(),
    about_me: Joi.string().min(0).max(5 * 1000).optional(),
    location: Joi.any().optional()
});

module.exports = profileSchema;