var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  HOST_BASE: '"/baseUrl"',
  API_HOST_BASE: '"/api"'
})
