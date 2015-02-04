import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var filterController = this.controllerFor('filter');
    var activeFilters = filterController.get('activeFilters');

    // TODO build the entity attribute query string from active filters 
    return this.store.find('report', {
      current_page: params.currentPage,
      per_page: params.perPage
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('application').send('showSidebar');
    this._super(controller, model);
  }
});
