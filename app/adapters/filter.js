import LocalStorageAdapter from './local-storage';
import DS from 'ember-data';

var FilterAdapter = DS.Adapter.extend({
  find: function(store, type, id) {
    var result = { id: 'self' };
    if (window.localStorage && window.localStorage[type.typeKey]) {
      result =  JSON.parse(window.localStorage[type.typeKey]);
    } else if(window.localStorage) {
      window.localStorage[type.typeKey] = JSON.stringify(result);
    }
    return result;
  },
  createRecord: function() {
  },
  updateRecord: function(store, type, record) {
    var data = this.serialize(record, { includeId: true });

    if(window.localStorage) {
      window.localStorage[type.typeKey] = JSON.stringify(data);
    }
  },
  deleteRecord: function() {
  },
  findAll: function(store, type, sinceToken) {
  },
  findQuery: function() {
  }
});

export default FilterAdapter;
