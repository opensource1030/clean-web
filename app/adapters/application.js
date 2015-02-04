import DS from 'ember-data';
import ENV from '../config/environment';

var ApplicationAdapter = DS.RESTAdapter.extend({
  host: ENV.APP.apiHost,
  namespace: ENV.APP.apiNamespace,
  extension: ENV.APP.apiExtension,

  buildURL: function(type, id, record) {
    var url = this.host + this.namespace;
    if (!id) {
      url += this.pathForType(type) + this.extension;
    } else {
      url += this.pathForType(type) + '/' + id + this.extension;
    }
    return url
  }
});

export default ApplicationAdapter;

