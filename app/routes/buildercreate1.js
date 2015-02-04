import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'buildercreate',
  setupController: function(controller, model) {
    this.controllerFor('application').send('hideSidebar');
  }
});
