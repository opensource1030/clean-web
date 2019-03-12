var merge = require('webpack-merge')
var devEnv = require('./local.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  URL_API: '"http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io"', // stoplight.io proxy to Dev
  URL: '"http://localhost:8080"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
  LEGACY_URL: '"https://dev.legacy.wirelessanalytics.com"',
  FEATURESV:{
   AWESOME_FEATURE: true,
   FEATURE_IN_DEVELOPMENT: true// isProduction() ? false : true,
 },
 FEATURES: {
   "Procurements": {
       enabled: true,
       users: {
           "user@mail.com": true,
           "*@email.com": true
       }
   },
   "Packages": {
       enabled: false,
       users: {
           "user@mail.com": true,
           "*@email.com": true
       }
   },
   "Presets": {
       enabled: true,
       users: {
           "user@mail.com": true,
           "*@email.com": true
       }
   },
   "ManageDevices": {
       enabled: true,
       users: {
           "user@mail.com": true,
           "*@email.com": true
       }
   },
   "ManageServices": {
       enabled: true,
       users: {
           "user@mail.com": true,
           "*@wa.com": true
       }
   }
}
})
