'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'juice-core',
    environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: process.env.API_KEY || 'apikey',
      authDomain: process.env.AUTH_DOMAIN || 'juice-core-dev.firebaseapp.com',
      databaseURL: process.env.DATABASE_URL || 'https://juice-core-dev.firebaseio.com',
      storageBucket: process.env.STORAGE_BUCKET || 'juice-core-dev.appspot.com'
    },

    intercom: {
      appId: process.env.INTERCOM_APP_ID || 'appId',
      enabled: true,
    },

    'ember-simple-auth': {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'productions',
      routeIfAlreadyAuthenticated: 'productions',
      auth0: {
        domain: process.env.AUTH0_DOMAIN || 'youpressed-dev.auth0.com',
        clientID: process.env.AUTH0_CLIENT_ID || 'client',
        logoutReturnToURL: 'index',
      }
    },

    docService: {
      allDocsEndpoint: process.env.ALL_DOCS_ENDPOINT || 'docsUrl'
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-inline'",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self'",
    'img-src': "'self' data:",
    'media-src': "'self'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.urlAfterLogout = 'http://localhost:4200/login';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
