'use strict';

const Hapi = require('hapi');
require('dotenv').config();

// Import Routes
const ProfileRoutes = require('./routes/profile/route');
const FixedValueRoutes = require('./routes/fixed_values/route');

// Create a server with a host and port
const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT
});

// Add the Fixed Value Route
server.route(FixedValueRoutes);

// Add the Profile Route
server.route(ProfileRoutes);

module.exports = server;