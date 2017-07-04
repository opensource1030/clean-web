import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  getMatchedPackages (userId, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_users_packages').then(result => {
      http.get(API_BASE_URL + '/users/packages/' + userId, _.extend({}, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_packages').then(result => {
      http.get(API_BASE_URL + '/packages', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  getOne (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_package').then(result => {
      http.get(API_BASE_URL + '/packages/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_package').then(result => {
      http.post(API_BASE_URL + '/packages', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_package').then(result => {
      http.patch(API_BASE_URL + '/packages/' + id, params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    $store.dispatch('scope_token/get', 'delete_package').then(result => {
      http.delete(API_BASE_URL + '/packages/' + id, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
