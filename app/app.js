import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

import money from 'clean/helpers/money';

//Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'clean', // TODO: loaded via config
  Resolver: Resolver
});
loadInitializers(App, 'clean');

Ember.Handlebars.registerHelper('money', money);

export default App;

