import { http } from 'vue'
import $store from './../store'
import { AuthHelper } from './../helpers'

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_users').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/users', params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  get (id, params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_user').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/users/' + id, params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'create_user').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.post(API_BASE_URL + '/users', params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'update_user').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.patch(API_BASE_URL + '/users/' + id, params).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'delete_user').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.delete(API_BASE_URL + '/users/' + id).then(res => cb(res), err => errCb(errCb))
    }, err => errCb(err))
  },

  add_bulk (form, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'create_user').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.post(API_BASE_URL + '/users/upload', form).then(res => cb(res), err => errCb(err))
    }, err => errCb(err))
  }
}
