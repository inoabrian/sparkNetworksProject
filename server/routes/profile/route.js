const Joi               = require('joi');
const ProfileSchema     = require('../../models/profile/model');
const ProfileController = require('../../controllers/profile/controller');

const defaultProfile = {
    method: 'GET', 
    path: '/profile/{userId}',
    handler: ProfileController.get,
    options: {
        validate: {
            params: {
                userId: Joi.string().required()
            }
        }
    }
};

const updateProfile = {
    method: 'PATCH',
    path: '/profile/{userId}',
    handler: ProfileController.patch,
    options: {
        validate: {
            params: {
                userId: Joi.string().required()
            },
            payload: ProfileSchema
        }
    }
};

module.exports = [
    defaultProfile,
    updateProfile
];
