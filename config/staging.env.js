var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  URL_API: '"http://lfce85j83fdtoxhkw.stoplight-proxy.io"', // stoplight.io proxy to dev
  URL:'"http://staging.wirelessanalytics.com"',
  CLIENT_ID:'"g73hhd8j3bhcuhdbbs88e4wd"',
  CLIENT_SECRET:'"786wndkd8iu4nn49ixjndfodsde33"'
})