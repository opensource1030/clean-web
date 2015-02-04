import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return '$' + parseFloat(value).toFixed(2);
});
