import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		//jQuery Here
		this._super();
    	var el = this.$();

    	$('.truncate').on('click', function() {
    		$(this).toggleClass('open');
    	});
    	this.$('.select-moz select').customSelect();
	}
});
