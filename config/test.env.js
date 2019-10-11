var merge = require('webpack-merge')
var devEnv = require('./dev.env')



module.exports = merge(devEnv, {
  NODE_ENV: 'testing',
  URL_API: 'http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io', // stoplight.io proxy to Dev
  URL: 'http://localhost:8080',
  CLIENT_ID: '2',
  CLIENT_SECRET: 'ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7',
  LEGACY_URL: 'https://dev.legacy.wirelessanalytics.com',
  VERSION:'v2019.10.0',
  EV_URL: 'https://apio.wirelessanalytics.com/api/v2',
  EV_PROXY_KEY: 'e0fb92402becd52b1116bda6872056227d56af22a73a047b39fd0741495a1bc7',
})
