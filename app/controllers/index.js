import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  showSupport: true,

  actions: {
    toggleSupport: function() {
      this.set('showSupport', !this.get('showSupport'));
    }
  }
});
