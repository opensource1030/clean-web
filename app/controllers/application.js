import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({

  isSidebarVisible: true,

  // global search field
  search: '',

  actions: {
    /**
     * Toggle the main wrapper
     * - Used primarily by the filters sidebar controller
     */
    toggleSidebar: function() {
      this.set('isSidebarVisible', !this.get('isSidebarVisible'));
    },
    showSidebar: function() {
      this.set('isSidebarVisible', true);
    },
    hideSidebar: function() {
      this.set('isSidebarVisible', false);
    }
  }

});


export default ApplicationController;
