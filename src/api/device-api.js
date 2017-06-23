import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_devices').then(result => {
      http.get(API_BASE_URL + '/devices', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  getOne (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_device').then(result => {
      http.get(API_BASE_URL + '/devices/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_device').then(result => {
      http.post(API_BASE_URL + '/devices', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_device').then(result => {
      http.patch(API_BASE_URL + '/devices/' + id, params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    $store.dispatch('scope_token/get', 'delete_device').then(result => {
      http.delete(API_BASE_URL + '/devices/' + id, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(errCb))
    }, err => errCb(err))
  }
}