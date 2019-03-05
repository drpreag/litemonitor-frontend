'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"http://litemonitor-backend.profidata/api"' 
  //API_BASE_URL: "'https://lm.softwarepieces.com/api'"
})
