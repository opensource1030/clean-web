import Ember from 'ember';

var FiltersView = Ember.View.extend({
  tagName: 'div',
  classNames: ['sidebar-wrapper'],
  templateName: 'filters',

  didInsertElement : function(){
    this._super();

    $('.select-container').click(function() { 
      $('.select-container').not(this).removeClass('active'); 
      $('.select-container').not(this).find('.options').removeClass('active'); 
      $(this).toggleClass('active');
      $(this).find('.options').toggleClass('active');
    });

    $('.select-container .options ul li').click(function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      $(this).parent().find('.fa').removeClass('fa-check');
      $(this).find('.fa').addClass('fa-check');
    });
  }
});

export default FiltersView;
