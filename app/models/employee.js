import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  supervisorEmail: DS.attr('string'),
  division: DS.attr('string'),
  department: DS.attr('string'),
  office: DS.attr('string'),
  group: DS.attr('string'),
  active: DS.attr('boolean')
});
