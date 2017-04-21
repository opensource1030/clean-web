module.exports = {
  NODE_ENV: '"local"',
  // stoplight.io Mock Server
    URL_API: '"http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io"',
  // URL_API: '"http://clean.api/"',
    // URL_API: '"https://devapi.wirelessanalytics.com"',
  URL: '"http://localhost:8080"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
    LEGACY_URL: '"https://devlegacy.wirelessanalytics.com"',
  FEATURESV:{
   AWESOME_FEATURE: true,
   FEATURE_IN_DEVELOPMENT: true// isProduction() ? false : true,
 },
  FEATURES: {
    "Procurements": {
        enabled: false,
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
        enabled: false,
        users: {
            "user@mail.com": true,
            "*@email.com": true
        }
    },
    "ManageDevices": {
        enabled: false,
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
}
