const Joi               = require('joi');
const Boom              = require('boom');
const DefaultProfile    = require('./default.json');
const ProfileSchema     = require('../../models/profile/model');

const defaultProfile = {
    method: 'GET', 
    path: '/profile/{userId}',
    handler: async function (request, h) {
        const db = request.mongo.db;
        
        // safely extract the userId parameter
        const userId = request.params.userId ? encodeURIComponent(request.params.userId) : null;

        try {
            const result = await db
                .collection('sparkusers')
                .findOne({"userId" : userId}, {_id: 0});

            if(result === null) {
                return h.response("Not Found")
                    .code(404)
                    .message("could not find user with provided id");
            }
            
            return result;
        }
        catch (err) {
            throw Boom.internal('Internal MongoDB error', err);
        }
    }
};

const updateProfile = {
    method: 'PATCH',
    path: '/profile/{userId}',
    handler: async function(request, h) {
        const db = request.mongo.db;

        // safely extract the userId parameter
        const userId = request.params.userId ? encodeURIComponent(request.params.userId) : null;

        const requestPayload = request.payload;

        try {
            let user = await db.collection('sparkusers').findOne({"userId": userId}, {_id: 0}); 
        
            const userExists = user != undefined && user != null;
    
            // If we don't find a user with the provided userId return a 400 
            if(!userExists) {
                return h.response("Not Found")
                .code(404)
                .message("could not find user with provided id");
            }

            for(let _key in requestPayload) {
                user[_key] = requestPayload[_key];
            }

            const updatedUser = await db.collection('sparkusers').updateOne({"userId": userId}, {$set: user});
        }
        catch (err) {
            throw Boom.internal('Internal MongoDB error', err);
        }

        return h.response("No Content")
            .code(204);
    },
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