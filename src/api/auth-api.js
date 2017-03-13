import Vue from 'vue'
import VueResource from 'vue-resource'

const { Store } = require('yayson')()
const store = new Store()

const API_BASE_URL = process.env.URL_API

export default {
  login (params, cb, errCb) {
    Vue.http.get(API_BASE_URL + '/doSSO/' + params.email + '?redirectToUrl=' + process.env.URL + '/sso').then(res => cb(res), err => errCb(err))
  },

  loginLocal (params, cb, errCb) {
    Vue.http.post(API_BASE_URL + '/oauth/token', {
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      username: params.email,
      password: params.password,
    }).then(res => cb(res), err => errCb(err))
  },

  profile (params, cb, errCb) {
    Vue.http.get(API_BASE_URL + '/users/me', {
      headers: this.getAuthHeader(params.token),
      include: 'udlvalues'
    }).then(res => cb(store.sync(res.data)), err => errCb(err))
  },

  getAuthHeader (token) {
    return {
      Authorization: 'Bearer ' + token
    }
  }
}