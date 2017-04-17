import { http } from 'vue'

const API_BASE_URL = process.env.URL_API

export default {
  search (params, cb, errCb) {
    http.get(API_BASE_URL + '/companies', params).then(res => cb(res), err => errCb(err))
  },

  get (id, params, cb, errCb) {
    http.get(API_BASE_URL + '/companies/' + id, params).then(res => cb(res), err => errCb(err))
  },

  create (params, cb, errCb) {
    http.post(API_BASE_URL + '/companies', params).then(res => cb(res), err => errCb(err))
  },

  update (id, params, cb, errCb) {
    http.patch(API_BASE_URL + '/companies/' + id, params).then(res => cb(res), err => errCb(err))
    // http.get(API_BASE_URL + '/companies/' + id, params).then(res => cb(res), err => errCb(err))
  },

  remove (id, cb, errCb) {
    http.delete(API_BASE_URL + '/companies/' + id).then(res => cb(res), err => errCb(errCb))
  }
}
