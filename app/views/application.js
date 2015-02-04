import Ember from 'ember';

var ApplicationView = Ember.View.extend({
  didInsertElement : function() {
    $(document).foundation();

    var expandElement = $( '.menu-container, .menu li');
    var expandedElement = $('li.dropdown > a');

	$('.switch, .menu li, .menu li div').not('.user, .search, .title-area, .dropdown').click(function() {
		if (expandElement.not('.switch, .title-area').hasClass('expand')){
			expandElement.not('.switch, .title-area').removeClass('expand');
		} else {
			expandElement.not('.switch, .title-area').addClass('expand');
		}
		expandedElement.removeClass('expanded');
		expandedElement.next('.row').removeClass('expanded');

	});

	expandedElement.click(function() {
		$(this).next('.row').toggleClass('expanded');
		$(this).toggleClass('expanded');
	});

    $('.options ul li').click(function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$(this).parent().find('.fa').removeClass('fa-check');
		$(this).find('.fa').addClass('fa-check');
		$(this).parent().children('li');

    });


    $(".menu li.dropdown, .menu li.user").hoverIntent({    
	    sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)    
	    interval: 10,  // number = milliseconds for onMouseOver polling interval    
	    timeout: 800,   // number = milliseconds delay before onMouseOut    
	    over:function(){
	        $(this)
	            .removeClass("hoverOut").toggleClass("hoverIn");
	    },
	    out: function(){
	        $(this)
	            .removeClass("hoverIn").toggleClass("hoverOut");
	    }
	});

  }
});

export default ApplicationView;
