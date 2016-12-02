
module.exports = {
  NODE_ENV: '"local"',
  // stoplight.io Mock Server
  URL_API: '"http://lfce85j83fdtoxhkw-mock.stoplight-proxy.io"',
  URL: '"http://localhost:8080"',
  CLIENT_ID: '"2"',
  CLIENT_SECRET: '"ab9QdKGBXZmZn50aPlf4bLlJtC4BJJNC0M99i7B7"',
  FEATURES: [

         {
          type: "'user'",
          enabled: true,
          users: [
            {
              username:"'mateo@email.com'",
              enabled:true
            }, {
              username:"'Sample3433@email.com'",
              enabled:false
            }
          ]
        }
      ,
       {
          type: "'admin'",
          enabled: false,
          users: [
            {
            username:"'Sample3433@email.com'",
            enabled:false
            }, {
            username:"'dele@email.com'",
            enabled:false
            }
          ]

        }


    ]
}
