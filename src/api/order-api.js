import {http} from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  getMatchedPackages (userId, cb, errCb) {
    // let data = params
    http.get(API_BASE_URL + '/users/packages/' + userId).then(res => cb(res), err => errCb(err))
  },
  get (id, params, cb, errCb) {
    http.get(API_BASE_URL + '/orders/' + id, params).then(res => cb(res), err => errCb(err))
  },
  search (params, cb, errCb) {
    http.get(API_BASE_URL + '/orders', params).then(res => cb(res), err => errCb(err))
  },

  create (params, cb, errCb) {
    http.post(API_BASE_URL + '/orders', params).then(res => cb(res), err => errCb(err))
  },

  update (id, params, cb, errCb) {
    http.patch(API_BASE_URL + '/orders/' + id, params).then(res => cb(res), err => errCb(err))
  },
}