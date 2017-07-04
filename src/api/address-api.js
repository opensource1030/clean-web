import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_addresses').then(result => {
      http.get(API_BASE_URL + '/addresses', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  get (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_address').then(result => {
      http.get(API_BASE_URL + '/addresses/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_address').then(result => {
      http.post(API_BASE_URL + '/addresses', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_address').then(result => {
      http.patch(API_BASE_URL + '/addresses/' + id, params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    $store.dispatch('scope_token/get', 'delete_address').then(result => {
      http.delete(API_BASE_URL + '/addresses/' + id, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
}
