var merge = require('webpack-merge')
var prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"local"',
  URL_API: '"http://lfce85j83fdtoxhkw.stoplight-proxy.io/"', // stoplight.io mock server
  URL:'"http://localhost:8080"',
  CLIENT_ID:'"2"',
  CLIENT_SECRET:'"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"'

})
