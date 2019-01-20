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

describe('We should be able to update our user profile,', () => {

    it('should have a status code of 204', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({
            method: 'PATCH',
            url: '/profile/1',
            payload: {
                "location": {
                    "lat": "123",
                    "long": "123"
                }
            }
        });

        // Check status code
        expect(response.statusCode).to.equal(204);
    });

    it('should have the updated value for location', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({
            method: 'GET',
            url: '/profile/1'
        });

        // parse our payload
        const payload = JSON.parse(response.payload);

        // extract our display name to assert the value
        const location = payload.location;

        // Check status code
        expect(location).to.equal({ "lat": "123", "long": "123" });
    })

    it('should not be allowed to patch height', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({
            method: 'PATCH',
            url: '/profile/1',
            payload: {
                "height": "test"
            }
        });

        // Check status code
        expect(response.statusCode).to.not.equal(204);
    });

    it('should not be allowed to patch with a display name with a length greater than 256 chars', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({
            method: 'PATCH',
            url: '/profile/1',
            payload: {
                "display_name": `1234567891011121314151617181920212
                223242526272829303132333435363738394041424344454647
                484950515253545556575859606162636465666768697071727
                374757677787980818283848586878889909192939495969798
                991001011021031041051061071081091101111121131141151
                161171181191201211221231241251261271281291301311321
                331341351361371381391401411421431441451461471481491
                501511521531541551561571581591601611621631641651661
                671681691701711721731741751761771781791801811821831
                841851861871881891901911921931941951961971981992002
                012022032042052062072082092102112122132142152162172
                182192202212222232242252262272282292302312322332342
                352362372382392402412422432442452462472482492502512
                52253254255256`
            }
        });

        // Check status code
        expect(response.statusCode).to.not.equal(204);
    });

    it('should be allowed to patch with a display name with a length equal to 256 chars', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({
            method: 'PATCH',
            url: '/profile/1',
            payload: {
                "display_name": `abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababab`
            }
        });

        // Check status code
        expect(response.statusCode).to.equal(204);
    });

    it('should not be allowed to patch userId', async () => {

        // wait for the response and the request to finish
        const response = await server.inject({
            method: 'PATCH',
            url: '/profile/1',
            payload: {
                "userId": `2`
            }
        });

        // Check status code
        expect(response.statusCode).not.to.equal(204);
    });

});