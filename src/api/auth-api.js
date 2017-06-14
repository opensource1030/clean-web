import { http } from 'vue'
import $store from './../store'
import { Utils, AuthHelper,  ScopeHelper } from './../helpers'

const {Store} = require('yayson')()
const store = new Store()

const API_BASE_URL = process.env.URL_API;

// Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  login (params, cb, errCb) {
    http.get(API_BASE_URL + '/doSSO/' + params.email + '?redirectToUrl=' + process.env.URL + '/sso')
      .then(res => cb(res), err => errCb(err))
  },

  register (params, cb, errCb) {
    http.post(API_BASE_URL + '/users', {
      data: params.data,
      url: process.env.URL
    }).then(res => cb(res), err => errCb(err))
  },

  resetPasswordEmail (email, params, cb, errCb) {
    http.get(API_BASE_URL + '/resetPassword/' + email, params).then(res => cb(res), err => errCb(err))
  },

  resetPasswords (identification, code, params, cb, errCb) {
    http.get(API_BASE_URL + '/resetPassword/' + identification + '/' + code, params).then(res => cb(res), err => errCb(err))
  },

  loginLocal (params, cb, errCb) {
    http.post(API_BASE_URL + '/oauth/token', {
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      username: params.email,
      password: params.password,
    }).then(res => cb(res), err => errCb(err))
  },

  singleSignOn (params, cb, errCb) {
    http.post(API_BASE_URL + '/oauth/token', {
      grant_type: 'sso',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      uuid: params,
    }).then(res => cb(res), err => errCb(err))
  },

  profile (params, cb, errCb) {
    // http.get(API_BASE_URL + '/users/me', params).then(res => cb(store.sync(res.data)), err => errCb(err))
    // console.log('login_token', $store.state.auth.token)

    AuthHelper.setAuthHeader($store.state.auth.token)
    $store.dispatch('scope_token/get', 'get_user_me').then(result => {
      AuthHelper.setAuthHeader(result.accessToken)
      http.get(API_BASE_URL + '/users/me', params).then(res => cb(store.sync(res.data)), err => errCb(err))
    }, err => errCb(err))
  },

  scopeToken (params, cb, errCb) {
    http.post(API_BASE_URL + '/oauth/personal-access-tokens', params).then(res => cb(res), err => errCb(err))
  },

  getAuthHeader (token) {
    var login_token = token  || $store.getters['auth/getLoginToken']
    // console.log('getAuthHeader', token)
    return {
      Authorization: 'Bearer ' + login_token
    }
  },

  getUser (uId, params, cb, errCb) {
    http.get(API_BASE_URL + '/users/' + uId + '?' + params).then(res => cb(res), err => errCb(err))
  }
}