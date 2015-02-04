import DS from 'ember-data';

export default DS.Model.extend({
  active: DS.attr('boolean'),
  // custom transform
  billing: DS.attr('charges')
});
