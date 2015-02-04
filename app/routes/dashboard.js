import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('application').send('showSidebar');
    this._super(controller, model);
  }
});
