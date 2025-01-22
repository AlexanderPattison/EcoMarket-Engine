const path = require('path');
const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
    })(config);

    return config;
};