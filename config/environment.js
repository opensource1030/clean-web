/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'clean',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      apiHost: 'http://192.168.56.101',
      apiNamespace: 'api'
    }
  };

  if (environment === 'development') {
  // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.apiHost = '';
    ENV.APP.apiNamespace = 'assets/json/';
    ENV.APP.apiExtension = '.json';
  }

// pixelmedia extranet builds for UI previews
  if (environment === 'extranet') {
    ENV.locationType = 'hash';
    ENV.baseURL = '/pSecured/pClients/pBuild/WRA401/files/dist/';
  }

  
  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }


  if (environment === 'production') {

  }

  return ENV;
};
