import Ember from 'ember';
import DS from 'ember-data';

var LocalStorageAdapter = DS.Adapter.extend({
  find: function(store, type, id) {
    var result = { id: 'singleton' };
    if (window.localStorage && window.localStorage[type.typeKey]) {
      result =  JSON.parse(window.localStorage[type.typeKey]);
    }
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run(null, resolve, result);
    });
  },
  createRecord: function() {
    console.log(arguments);
    console.log("test");
  },
  updateRecord: function() {
    console.log(arguments);
  },
  deleteRecord: function() {
    console.log(arguments);
  },
  findAll: function(store, type, sinceToken) {
    var result = {};
    if (window.localStorage && window.localStorage[type.typeKey]) {
      result =  JSON.parse(window.localStorage[type.typeKey]);
    }
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run(null, resolve, result);
    });
  },
  findQuery: function() {
    console.log(arguments);
    console.log("test");
  }
});

export default LocalStorageAdapter;
