const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"stage"',

  HOST_BASE: '"http://apitest.xohaa.net"',
  API_HOST_BASE: '"http://apitest.xohaa.net/api/v1"'
});
