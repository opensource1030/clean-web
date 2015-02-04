import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement : function(){
    this._super();

    $(document).foundation();
    $(window).bind('resize', function () {
      var offset = $(".report-table-container").offset().top;
      $(".report-table-container").height($(window).height() - offset - 20);
    });
    var offset = $(".report-table-container").offset().top;
    $(".report-table-container").height($(window).height() - offset - 20);
    this.$('.select-moz select').customSelect();
  }
});

