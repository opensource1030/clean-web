import DS from 'ember-data';

var phoneRegex = /(\d{3})(\d{3})(\d{4})/;

var Report = DS.Model.extend({
  phone: function() {
    var id = this.get('id');
    var phoneParts = phoneRegex.exec(id);
    return '(' + phoneParts[1] + ') ' + phoneParts[2] + '-' + phoneParts[3];
  }.property('id'),

  employee: DS.belongsTo('employee', {flatten: true}),
  asset: DS.belongsTo('asset', {flatten: true}),
  carrier: DS.belongsTo('carrier', {flatten: true}),
  devices: DS.hasMany('device')
});

export default Report;
