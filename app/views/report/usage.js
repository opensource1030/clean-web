import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['usage'],

  didInsertElement: function() {
    this._super();
    var el = this.$();

    el.removeClass('open');
    var view = this;

    setTimeout(function() {
      el.addClass('open');
    }, 1);
  },

  willDestroyElement: function() {
    this._super();
    var el = this.$();
  }
});
