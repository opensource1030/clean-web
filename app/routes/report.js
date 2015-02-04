import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // trigger a hard refresh for reports details to fill in entire model
    var record = this.store.getById('report', params.report_id);

    if (record) {
      record.reload();
    }

    return this.store.find('report', params.report_id);
  },
  setupController: function(controller, model) {
    // trigger a hard refresh for reports details to fill in entire model
    var record = this.store.getById('report', model.id);
    if (record) {
      record.reload();
    }

    controller.set('model', this.store.find('report', model.id));
  },

  actions: {
    dismissReport: function() {
      this.transitionTo('reports');
    }
  }
});
