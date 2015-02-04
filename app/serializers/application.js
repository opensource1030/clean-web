import Ember from 'ember';
import DS from 'ember-data';

var get = Ember.get, set = Ember.set;
var forEach = Ember.ArrayPolyfills.forEach;
var map = Ember.ArrayPolyfills.map;

var ApplicationSerializer = DS.RESTSerializer.extend({
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },
  normalizePayload: function(rawPayload) {
    if(rawPayload.data) {
      return rawPayload.data;
    }
    return rawPayload;
  },
  extractRelationships: function(type, payload) {
    var typeName = type.typeKey;

    forEach.call(payload[typeName], function(instancePayload) {
      type.eachRelationship(function(name, relationship) {
        var payloadName = relationship.options.flatten ? Ember.String.pluralize(name) : name;

        if (instancePayload[payloadName]) {
          var normalForm = instancePayload[payloadName]['data'];

          // do we need to extract the first item (ie. reduce array to single item)
          if (relationship.options.flatten) {
            normalForm = normalForm[0];
            instancePayload[name] = normalForm.id;
            delete instancePayload[payloadName];
          } else {
            instancePayload[name] = normalForm.map(function(n) {
              return n.id;
            });
          }
        }

        if (!payload[Ember.String.pluralize(name)]) {
          payload[Ember.String.pluralize(name)] = [];
        }

        if (relationship.options.flatten) {
          // already flattened
          payload[Ember.String.pluralize(name)].push(normalForm);
        } else {
          // push all the elements
          Array.prototype.push.apply(payload[Ember.String.pluralize(name)], normalForm)
        }
      });
    });

    return payload;
  },
  extractArray: function(store, primaryType, rawPayload) {
    var payload = {};
    var primaryTypeName = primaryType.typeKey;
    payload[primaryTypeName] = this.normalizePayload(rawPayload);
    var primaryArray;

    payload = this.extractRelationships(primaryType, payload);

    for (var prop in payload) {
      var typeKey = prop;
      var forcedSecondary = false;

      if (prop.charAt(0) === '_') {
        forcedSecondary = true;
        typeKey = prop.substr(1);
      }

      var typeName = this.typeForRoot(typeKey);
      var type = store.modelFor(typeName);
      var typeSerializer = store.serializerFor(type);
      var isPrimary = (!forcedSecondary && (type.typeKey === primaryTypeName));

      /*jshint loopfunc:true*/
      var normalizedArray = map.call(payload[prop], function(hash) {
        return typeSerializer.normalize(type, hash, prop);
      }, this);

      if (isPrimary) {
        primaryArray = normalizedArray;
      } else {
        store.pushMany(typeName, normalizedArray);
      }
    }

    return primaryArray;
  },
  extractSingle: function(store, primaryType, rawPayload, id, requestType) {
    var arr = this.extractArray(store, primaryType, rawPayload);
    return arr[0];
  }
});

export default ApplicationSerializer;
