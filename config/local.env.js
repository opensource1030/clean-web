var merge = require('webpack-merge')
var Env = require('./local.env')

module.exports = merge(Env, {
  NODE_ENV: '"local"',
  URL_API: '"http://lfce85j83fdtoxhkw.stoplight-proxy.io/"', // stoplight.io mock server
  URL:'"http://localhost:8080"',
  CLIENT_ID:'"g73hhd8j3bhcuhdbbs88e4wd"',
  CLIENT_SECRET:'"786wndkd8iu4nn49ixjndfodsde33"'
})
