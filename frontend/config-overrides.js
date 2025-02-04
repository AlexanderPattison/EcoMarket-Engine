/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

// Define the configuration override function
const overrideConfig = override(
    addWebpackAlias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@slices': path.resolve(__dirname, 'src/slices'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@store': path.resolve(__dirname, 'src/store.ts'),
    }),
    function (config, env) {
        if (env === 'development') {
            config.devServer = {
                ...config.devServer,
                setupMiddlewares: (middlewares, devServer) => {
                    // Custom middleware can be added here if needed
                    if (!devServer) {
                        throw new Error('webpack-dev-server is not defined');
                    }
                    return middlewares;
                },
            };
        }
        return config;
    },
);

module.exports = overrideConfig;