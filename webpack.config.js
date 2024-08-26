// webpack.config.js
module.exports = {
    resolve: {
      alias: {
        'node:test': 'test',
      },
    },
  };

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  plugins: [new NodePolyfillPlugin()],
};
