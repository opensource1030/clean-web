import { http } from 'vue'
import $store from './../store'
import { AuthHelper } from './../helpers'

const { Store } = require('yayson')()
const store = new Store()

const API_BASE_URL = process.env.URL_API

export default {
  getAll (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_services').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/services', params).then(res => cb(res.data), (err) => errCb(err))
    }, err => errCb(err))
  },

  getOne (params, id ,cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_service').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/services/' + id, params).then(res => cb(store.sync(res.data)), (err) => errCb(err))
    }, err => errCb(err))
  },

  create (params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'create_service').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.post(API_BASE_URL + '/services', params).then((res) => cb(store.sync(res.data)), (err) => errCb(err))
    }, err => errCb(err))
  },

  update (id, params, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'update_service').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.patch(API_BASE_URL + '/services/' + id, params).then((res) => cb(store.sync(res.data)), (err) => errCb(err))
    }, err => errCb(err))
  },

  remove (id, cb, errCb) {
    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'delete_service').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.delete(API_BASE_URL + '/services/' + id).then(res => cb(res), err => errCb(errCb))
    }, err => errCb(err))
  }
}
