import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application', 'filter'],

  showSupport: false,

  actions: {
    toggleSupport: function() {
      this.set('showSupport', !this.get('showSupport'));
    }
  }
});
