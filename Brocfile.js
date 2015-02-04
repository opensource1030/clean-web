/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var compileSass = require('broccoli-sass');

var app = new EmberApp({
  vendorFiles: {
    'jquery.js': 'bower_components/jquery/dist/jquery.js'
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

app.import('bower_components/chosen_v1.1.0/chosen.jquery.min.js');
app.import('bower_components/chosen_v1.1.0/chosen.min.css');

app.import('bower_components/foundation/js/foundation.js');

app.import('bower_components/pikaday/pikaday.js');
app.import('bower_components/pikaday/css/pikaday.css');

app.import('bower_components/jquery-ui/jquery-ui.js');

app.import('bower_components/jquery-mousewheel/jquery.mousewheel.js');

app.import('bower_components/jquery-hoverIntent/jquery.hoverIntent.js');

app.import('bower_components/antiscroll/antiscroll.js');
app.import('bower_components/antiscroll/antiscroll.css');

app.import('bower_components/ember-table/dist/ember-table.js');
app.import('bower_components/ember-table/dist/ember-table.css');

var remPolyfill = pickFiles('bower_components/REM-unit-polyfill/js/', {
    srcDir: '/',
    files: ['**/*.js'],
    destDir: '/assets/js'
});


var chosen = pickFiles('bower_components/chosen_v1.1.0/', {
    srcDir: '/',
    files: ['**/*.png'],
    destDir: '/assets'
});
module.exports = mergeTrees([
  app.toTree(),
  remPolyfill,
  chosen
]);
