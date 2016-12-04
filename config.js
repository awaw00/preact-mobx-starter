// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  path: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
  },
  dev: {
    port: 8080,
    proxyTable: {}
  }
};
