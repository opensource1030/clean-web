import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  mobile: DS.attr('string'),
  billMonth: DS.attr('string'),
  accountNumber: DS.attr('string'),
  invoiceNumber: DS.attr('string'),
  carrier: DS.attr('string'),
  deviceType: DS.attr('string'),
  deviceOS: DS.attr('string'),
  country: DS.attr('string'),
  region: DS.attr('string')
});
