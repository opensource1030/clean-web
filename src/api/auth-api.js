import _ from "lodash";
import Vue from "vue";
import VueResource from 'vue-resource'
import $store from "./../store";
import {AuthHelper} from "./../helpers";
var config = require('../../config/dev.env')

Vue.use(VueResource)

const http = Vue.http

const {Store} = require('yayson')()
const store = new Store()

const API_BASE_URL = config.URL_API;

// Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

export default {
  login (params, cb, errCb) {
    console.log(API_BASE_URL)
    console.log(params.email)
    console.log(config.URL)
    http.get(API_BASE_URL + '/doSSO/' + params.email + '?redirectToUrl=' + config.URL + '/sso')
      .then(res => cb(res), err => errCb(err))
  },

  register (params, cb, errCb) {
    http.post(API_BASE_URL + '/users', {
      data: params.data,
      url: config.URL
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
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      username: params.email,
      password: params.password,
      scope: '*'
    }).then(res => cb(res), err => errCb(err))
  },

  singleSignOn (params, cb, errCb) {
    http.post(API_BASE_URL + '/oauth/token', {
      grant_type: 'sso',
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      uuid: params,
    }).then(res => cb(res), err => errCb(err))
  },

  refreshLoginToken (params, cb, errCb) {
    http.post(API_BASE_URL + '/oauth/token', params).then(res => cb(res), err => errCb(err))
  },

  scopeToken (params, cb, errCb) {
    $store.dispatch('auth/getLoginToken').then((result) => {
      http.post(API_BASE_URL + '/oauth/personal-access-tokens', params, AuthHelper.getAuthHeader(result.access_token)).then(res => cb(res), err => errCb(err))
    }, (err) => {
      errCb(err)
    })
  },

  profile (params, cb, errCb) {
    // http.get(API_BASE_URL + '/users/me', params).then(res => cb(store.sync(res.data)), err => errCb(err))
    // console.log('login_token', $store.state.auth.token)

    $store.dispatch('scope_token/get', 'get_user_me').then(result => {
      http.get(API_BASE_URL + '/users/me', _.extend(params, AuthHelper.getAuthHeader(result.accessToken))).then(res => cb(store.sync(res.data)), err => errCb(err))
    }, err => errCb(err))
  },

  getCompany (url, cb, errCb) {
    http.get(url, {}).then(res => cb(res), err => errCb(err))
  },
}
