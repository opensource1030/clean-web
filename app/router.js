import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberENV.locationType
});

Router.map(function() {
  this.route('application');

  /* Reports */
  this.resource('reports', function(){
    // we nest routes here to make nested templates/outlets easier
    // i.e. the "report" renders within the reports template to facilitate the
    // slide-over functionality
    this.resource('report', { path: "/:report_id" }, function() {
      this.route('usage');
    });
  });

  this.route('dashboard');
  this.route('landing2');
  this.route('landing3');
  this.route('builder');
  this.route('builder.create1');
  this.route('buildercreate1');
  this.route('buildercreate2');
  this.route('buildercreate3');
});

export default Router;
