# CLEAN Web App

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [webpack guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

[![Code Climate](https://codeclimate.com/repos/580f8280bcefe9007c001de8/badges/ab683df30958d894650a/gpa.svg)](https://codeclimate.com/repos/580f8280bcefe9007c001de8/feed)

[![Test Coverage](https://codeclimate.com/repos/580f8280bcefe9007c001de8/badges/ab683df30958d894650a/coverage.svg)](https://codeclimate.com/repos/580f8280bcefe9007c001de8/coverage)

# How To Use Feature Flags
1. define feature toggles in webpack.<ENVIRONTMENT>.conf.js
  e.g. you can define the featurs in webpack.dev.conf.js
  var features = {
    AWESOME_FEATURE: true,
    FEATURE_IN_DEVELOPMENT: isProduction() ? false : true,
  }

2. feed the feature toggles into DefinePlugin for use with JavaScript
  e.g. you can define the featurs in webpack.dev.conf.js
  plugins: [
    new webpack.DefinePlugin({
      'features': features
    })
  ]

3. define feature in VueComponent
  data() {
    features: features
  }

4. Guard your code with feature toggles in JavaScript
  if (features.AWESOME_FEATURE) {
    ...
  }

5. Guard your code with feature toggles in Vue templates
  <template v-if="features.FEATURE_IN_DEVELOPMENT">
    ...
  </template>