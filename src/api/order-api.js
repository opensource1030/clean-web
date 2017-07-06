import {http} from "vue";
import $store from "./../store";
import {AuthHelper} from "./../helpers";

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_orders').then(result => {
      http.get(API_BASE_URL + '/orders', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
  get (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'get_order').then(result => {
      http.get(API_BASE_URL + '/orders/' + id, _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
  /* get (id, params, cb, errCb) {
   http.get(API_BASE_URL + '/orders/' + id, params).then(res => cb(res), err => errCb(err))
   },*/
  create (params, cb, errCb) {
    $store.dispatch('scope_token/get', 'create_order').then(result => {
      http.post(API_BASE_URL + '/orders', params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    $store.dispatch('scope_token/get', 'update_order').then(result => {
      http.patch(API_BASE_URL + '/orders/' + id, params, AuthHelper.getAuthHeader(result.accessToken)).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
}