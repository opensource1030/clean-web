module.exports = {
  NODE_ENV: '"productionDev"',
  URL_API: '"http://dev.api.wirelessanalytics.com"',
  URL: '"http://dev.wirelessanalytics.com"',
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
};
