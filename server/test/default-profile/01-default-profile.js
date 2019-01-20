'use strict'

const Lab = require('lab')
const Code = require('code')
const HapiServer = require('../../server');

// Test files must require the lab module, and export a test script
const { describe, it, beforeEach } = exports.lab = Lab.script();

// shortcuts from code
const expect = Code.expect;

let server = HapiServer;

beforeEach(() => {
    server = HapiServer;
});

describe('There should be default profile information,', () => {

    it('should have a status code of 200', async () => {
        await server.register([{
            plugin: require('hapi-mongodb'),
            options: {
                url: process.env.MONGODB_URL,
                settings: {
                    poolSize: 10
                },
                decorate: true
            }
        }]);

        // wait for the response and the request to finish
        const response = await server.inject({ method: 'GET', url: '/profile/1' });

        // Check status code
        expect(response.statusCode).to.equal(200);
    })

    it('should have the display_name equal "Default Display Name"', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({ method: 'GET', url: '/profile/1' });

        // parse our payload
        const payload = JSON.parse(response.payload);

        // extract our display name to assert the value
        const displayName = payload.display_name;

        // Check status code
        expect(displayName).to.equal("Default Display Name");
    })

    it('should fail with value of 404 Not Found', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({ method: 'GET', url: '/profile' });

        expect(response.statusCode).to.equal(404);
    })
});