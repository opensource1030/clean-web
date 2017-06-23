import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_users').then(result => {
      http.get(API_BASE_URL + '/users', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  get (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_user').then(result => {
      http.get(API_BASE_URL + '/users/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_user').then(result => {
      http.post(API_BASE_URL + '/users', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_user').then(result => {
      http.patch(API_BASE_URL + '/users/' + id, params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    $store.dispatch('scope_token/get', 'delete_user').then(result => {
      http.delete(API_BASE_URL + '/users/' + id, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(errCb))
    }, err => errCb(err))
  },

  add_bulk (form, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_user').then(result => {
      http.post(API_BASE_URL + '/users/upload', form, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
