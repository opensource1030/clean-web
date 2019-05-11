module.exports = {
  NODE_ENV: 'development',
  // URL_API: '"https://dev.api.wirelessanalytics.com"',
  // URL_API: 'https://cleanapi.wirelessanalytics.com',
  URL_API: 'https://staging.api.wirelessanalytics.com',
  URL: 'http://localhost:8080',
  // URL: '"https://dev.wirelessanalytics.com"',
  CLIENT_ID: '2',
  CLIENT_SECRET: 'ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7',
  LEGACY_URL: 'https://dev.legacy.wirelessanalytics.com',
  SUPPORT_EMAIL: 'product.support@wirelessanalytics.com',
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
  }
}
