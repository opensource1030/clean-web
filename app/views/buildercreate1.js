import Ember from 'ember';

export default Ember.View.extend({

	didInsertElement: function() {
		//jQuery Here
		this._super();
    	var el = this.$();

    	$(".chosen-select").chosen({width: "100%"});
    	var pickerStart = new Pikaday({ field: $('#start')[0]});
    	var pickerEnd = new Pikaday({ field: $('#end')[0]});
    	this.$('.select-moz select').customSelect();
    	
	}
});
