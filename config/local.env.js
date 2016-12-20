
module.exports = {
  NODE_ENV: '"local"',
  // stoplight.io Mock Server
  URL_API: '"http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io"',
  URL: '"http://localhost:8080"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
  FEATURES: {
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
}
