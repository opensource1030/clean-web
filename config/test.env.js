var merge = require('webpack-merge')
var devEnv = require('./dev.env')



module.exports = merge(devEnv, {
  NODE_ENV: 'testing',
  URL_API: 'http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io', // stoplight.io proxy to Dev
  URL: 'http://localhost:8080',
  CLIENT_ID: '2',
  CLIENT_SECRET: 'ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7',
  LEGACY_URL: 'https://dev.legacy.wirelessanalytics.com',
  VERSION:'v2019.8.16',
  EV_URL: 'https://wa.easyvista.com/api/v1'
})
