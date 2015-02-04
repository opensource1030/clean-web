import Ember from 'ember';

var forEach = Ember.ArrayPolyfills.forEach;

export default Ember.ObjectController.extend({
  showAllEmployeeDetails: false,
  toggleEmployeeDetails: function() {
    this.set('showAllEmployeeDetails', !this.get('showAllEmployeeDetails'));
  },

  total: function() {
    var charges = [
      'asset.billing.voice.charges.total',
      'asset.billing.messaging.charges.total',
      'asset.billing.data.charges.total',
      'asset.billing.taxes.charges.total',
      'asset.billing.equipments.charges.total',
      'asset.billing.others.charges.total'
    ];

    var total = 0;

    forEach.call(charges, function(charge) {
      total += parseFloat(this.get(charge));
    }, this);

    return total;
  }.property('asset.billing.voice.charges.total'),

  actions: {
  }
});
