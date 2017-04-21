module.exports = {
  NODE_ENV: '"productionDev"',
  URL_API: '"https://devapi.wirelessanalytics.com"',
  URL: '"https://dev.wirelessanalytics.com"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
  LEGACY_URL: '"https://devlegacy.wirelessanalytics.com"',
  FEATURESV: {
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
      enabled: true,
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
  },
  SUPPORT_EMAIL: '"evsandbox@wirelessanalytics.com"'

};
