import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		//jQuery Here
		this._super();
    	var el = this.$();

    	$(".chosen-select").chosen({width: "100%"});
    	var pickerStart2 = new Pikaday({ field: $('#start2')[0]});
    	var pickerEnd2 = new Pikaday({ field: $('#end2')[0]});
    	this.$('.select-moz select').customSelect();
	}
});
