import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		//jQuery Here
		this._super();
    	var el = this.$();

    	$(".chosen-select").chosen({width: "100%"});
    	this.$('.select-moz select').customSelect();
	}
});
