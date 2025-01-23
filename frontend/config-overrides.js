const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

// Define the configuration override function
const overrideConfig = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@contexts': path.resolve(__dirname, 'src/contexts'),
  }),
);

module.exports = overrideConfig;
