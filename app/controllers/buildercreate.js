import Ember from 'ember';

export default Ember.ObjectController.extend({
  reportType: 'manual',
  
  isManual: function() {
    return this.get('reportType') === 'manual';
  }.property('reportType'),

  // expanded
  isVoiceExpanded: true,
  isDataExpanded: false,
  isMessagingExpanded: false,
  isRatePlansExpanded: false,
  isFeaturesExpanded: false,
  isOtherExpanded: false,

  actions: {
    toggle: function(sectionVar) {
      this.set(sectionVar, !this.get(sectionVar));
    }
  }
});
