import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    dismissSummary: function() {
      this.transitionTo('report');
    }
  }
});
