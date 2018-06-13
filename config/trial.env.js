module.exports = {
  NODE_ENV: '"trial"',
  URL_API: '"https://trial.api.wirelessanalytics.com"',
  URL: '"https://trial.wirelessanalytics.com"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
  LEGACY_URL: '"https://dev.legacy.wirelessanalytics.com"',
  SUPPORT_EMAIL: '"evprod@wirelessanalytics.com"',

  FEATURESV: {
    AWESOME_FEATURE: true,
    FEATURE_IN_DEVELOPMENT: true// isProduction() ? false : true,
  },

  EASYVISTA_CODE: 13,

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
  SUPPORT_EMAIL: '"product.support@wirelessanalytics.com"'

};
