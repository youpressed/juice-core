/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators', 'es7.functionBind']
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    sassOptions: {
      includePaths: [
        'bower_components/breakpoint-sass/stylesheets'
      ]
    },
    fingerprint: {
      exclude: [
        'apple-touch-icon',
        'favicon',
        'mstile',
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png'
      ]
    },
    'ember-cli-qunit': {
      useLintTree: false
    },
    dotEnv: {
      clientAllowedKeys: ['API_KEY', 'AUTH_DOMAIN', 'DATABASE_URL', 'STORAGE_BUCKET']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import("bower_components/ramda/dist/ramda.min.js");
  app.import("bower_components/mathjs/dist/math.min.js");
  app.import('bower_components/rxjs/dist/rx.all.min.js');

  return app.toTree();
};
