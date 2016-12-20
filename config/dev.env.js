module.exports = {
  NODE_ENV: '"productionDev"',
  URL_API: '"http://dev.api.wirelessanalytics.com"',
  URL: '"http://dev.wirelessanalytics.com"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
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
        enabled: false,
        users: {
            "user@mail.com": true,
            "*@wa.com": true
        }
    }
}
};
