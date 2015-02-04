import Ember from 'ember';

var FilterController = Ember.ObjectController.extend(Ember.Evented, {
  needs: 'application',

  actions: {
    run: function() {
      // TODO save filters and bubble up to refresh required models
    },
    reset: function() {
      // TODO reset filters model to defaults (delete and re-get)
    }
  } 
});

export default FilterController;
