module.exports = {
  NODE_ENV: '"production"',
  URL_API: '"http://api.wirelessanalytics.com"',
  URL: '"http://beta.wirelessanalytics.com"',
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

// module.exports = {
//   NODE_ENV: '"production"',
//   URL_API: '"https://api.wirelessanalytics.com"',
//   URL:'"http://beta.wirelessanalytics.com"',
//   CLIENT_ID:'"g73hhd8j3bhcuhdbbs88e4wd"',
//   CLIENT_SECRET:'"786wndkd8iu4nn49ixjndfodsde33"'
// }
