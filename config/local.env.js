/**
 * Created by lyc on 2017/6/23.
 */
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"local"',

  HOST_BASE: '"/baseUrl"',
  API_HOST_BASE: '"/api"'
});
