var merge = require('webpack-merge')
var prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_API: '"http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io"', // stoplight.io mock server
  URL:'"http://localhost:8080"',
  CLIENT_ID:'"g73hhd8j3bhcuhdbbs88e4wd"',
  CLIENT_SECRET:'"786wndkd8iu4nn49ixjndfodsde33"'
})
