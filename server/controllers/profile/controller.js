const Boom = require('boom');

module.exports.get = async (request, h) => {
    const db = request.mongo.db;

    // safely extract the userId parameter
    const userId = request.params.userId ? encodeURIComponent(request.params.userId) : null;

    try {
        const result = await db.collection('sparkusers').findOne({ "userId": userId }, { "_id" : 0 });

        if (result === null) {
            return h.response("Not Found")
                .code(404)
                .message("could not find user with provided id");
        }

        return result;
    }
    catch (err) {
        throw Boom.internal('Internal MongoDB error', err);
    }
};

module.exports.patch = async (request, h) => {
    const db = request.mongo.db;

    // safely extract the userId parameter
    const userId = request.params.userId ? encodeURIComponent(request.params.userId) : null;

    const patchObject = request.payload;

    try {
        let user = await db.collection('sparkusers').findOne({ "userId": userId }, { _id: 0 });

        // If we don't find a user with the provided userId return a 400 
        if (user == null) {
            return h.response("Not Found")
                .code(404)
                .message("could not find user with provided id");
        }

        // update the user object with the patch object's values
        let updatedUser = Object.assign(user, patchObject);

        // Update the changes in the database
        await db.collection('sparkusers').updateOne({ "userId": userId }, { $set: updatedUser });
    }
    catch (err) {
        throw Boom.internal('Internal MongoDB error', err);
    }

    return h.response("No Content")
        .code(204);
};
