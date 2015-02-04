import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function() {
    // load singleton filter model at app start
    this.controllerFor('filter').set('model', this.store.find('filter', 'self'));
  },
   exit: function(router){
     console.log('exit');
  },
  actions: {
    nothing: function() {},
    // This is necessary to render reports in the overlay "over" arbitrary routes.
    // We must treat the report popup as a sort-of modal dialog as nested
    // routes will not allow us
    reportDetail: function(reportId) {
      var controller = this.controllerFor('report');
      var record = this.store.getById('report', reportId);

      if (record) {
        record.reload();
      }

      controller.set('model', this.store.find('report', reportId));

      return this.render('report', {
        into: 'application',
        outlet: 'detail',
        controller: controller
      });
    },
    dismissReport: function() {
      return this.disconnectOutlet({
        outlet: 'detail',
        parentView: 'application'
      });
    },
    reportSummary: function(reportId) {
      return this.render('report.usage', {
        into: 'application',
        outlet: 'summary'
      });
    },
    dismissSummary: function() {
      return this.disconnectOutlet({
        outlet: 'summary',
        parentView: 'application'
      });
    },
    willTransition: function(transition) {
      $('body').scrollTop(0);
      this.disconnectOutlet({ outlet: 'detail', parentView: 'application' });
      this.disconnectOutlet({ outlet: 'summary', parentView: 'application' });
    }
  }
});
