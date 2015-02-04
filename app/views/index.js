import Ember from 'ember';

var AppView = Ember.View.extend({

  didInsertElement : function(){
    this._super();

    $(document).foundation();
    this.$('.select-moz select').customSelect();
  }
});

export default AppView;
