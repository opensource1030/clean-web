import { http } from 'vue'
import $store from './../store'
import { AuthHelper } from './../helpers'

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_addresses').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/addresses', params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  get (id, params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_address').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/addresses/' + id, params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'update_address').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.post(API_BASE_URL + '/addresses', params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'update_address').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.patch(API_BASE_URL + '/addresses/' + id, params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'delete_address').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.delete(API_BASE_URL + '/addresses/' + id, params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },
}
