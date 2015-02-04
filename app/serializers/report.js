import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from './application';

var get = Ember.get, set = Ember.set;
var forEach = Ember.ArrayPolyfills.forEach;
var map = Ember.ArrayPolyfills.map;

var ReportSerializer = ApplicationSerializer.extend({
});

export default ReportSerializer;

