const server = require('./server');

// Start the server
const init = async () => {

    // register hapi-pino for logging
    await server.register([
        {
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: process.env.NODE_ENV !== 'production',
                logEvents: ['request', 'response', 'onPostStart']
            }
        }, {
            plugin: require('hapi-mongodb'),
            options: {
                url: process.env.MONGODB_URL,
                settings: {
                    poolSize: 10
                },
                decorate: true
            }
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();