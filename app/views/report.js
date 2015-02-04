import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['report'],

  didInsertElement: function() {
    this._super();
    var el = this.$();

    el.removeClass('open');
    var view = this;

    setTimeout(function() {
      el.addClass('open');
    }, 1);


    el.find('.details-table .row-header a').click(function(ev) {
      ev.preventDefault();
      $(this).parents('tr').nextAll('.row-details').toggle();
    });

    var carouselControls = $('.carousel-controller li');
    var carouselSlide = $('.carousel li');

    carouselControls.click(function () {
      var index = $(this).index(),
      slideTarget = carouselSlide.eq(index);

      if (slideTarget.hasClass('active')){
          slideTarget.removeClass('active'); 
      } else {
          carouselSlide.removeClass('active');
          slideTarget.addClass('active');
      };

      if ($(this).hasClass('active')){
          $(this).removeClass('active');
      } else {
          carouselControls.removeClass('active');
          $(this).addClass('active');
      };

    });
    this.$('.select-moz select').customSelect();
  },

  willDestroyElement: function() {
    this._super();
    var el = this.$();
  }
});
