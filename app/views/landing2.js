import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this._super();
    this.$().parents('#wrapper').removeClass('toggled');
    this.$('.select-moz select').customSelect();
  }
});
