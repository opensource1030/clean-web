// import Vue,{http} from 'vue'
// import VueResource from 'vue-resource';
// Vue.use(VueResource);
import {http} from 'vue'

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
    http.get(API_BASE_URL + '/users/me', {
      headers: this.getAuthHeader(params.token),
      include: 'udlvalues'
    }).then(res => cb(store.sync(res.data)), err => errCb(err))
  },

  getAuthHeader (token) {
    return {
      Authorization: 'Bearer ' + token
    }
  },

  getUser (uId, params, cb, errCb) {
    http.get(API_BASE_URL + '/users/' + uId + '?' + params).then(res => cb(res), err => errCb(err))
  }
}